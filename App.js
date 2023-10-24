import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwt_decode from 'jwt-decode';
import { ScoreContext, UserContext, LoginContext, 
		GameContext, GameDataContext, BaseballContext,
		TimeContext, SportyContext } from './context';
import { useTimer, useIncrementScore, useGameData, useBaseball, useErrors } from './hooks';
import { storeBasedOnPlatform, checkStorageOnLogin, retrieveStoredData } from './helpers';
import { defaultData } from './defaultData';
import Home from './Home';
import Game from './Game';
import Baseball from './Baseball';
import Login from './Login';
import Select from './Select';
import Settings from './Settings';
import API from './Api';
import Header from './Header';

const Stack = createNativeStackNavigator();

export default function App() {

	const [time, clearTime, saveTime, setTime] = useTimer();
	const [score, incrementScore, setScore, resetScore, manualSetScore] = useIncrementScore();
	const [gameData, changePossession, incrementDown, setGameData, resetGameData, manualDataChange] = useGameData();
	const [defaultBaseball, setDefaultBaseball] = useState(defaultData.baseball);
	const [baseballData, incrementBalls, incrementStrikes, incrementOuts, setBaseballData, resetBaseballData, manualBaseballChange] = useBaseball(defaultBaseball);
	const [user, setUser] = useState(null);
	const [organization, setOrganization] = useState(null);
	const [season, setSeason] = useState(null);
	const [game, setGame] = useState(null);
	const [apiErrors, getApiErrors, setApiErrors] = useErrors();

	useEffect(() => {
		const checkIfLoggedIn = async () => {
			const storedToken = await storeBasedOnPlatform('get', "token");
			if (storedToken) {
				await loginUser(storedToken);
			};
		};
		const checkStorageWithoutLogin = async () => {
			const setters = {setScore, setGameData, setBaseballData, setTime};
			await retrieveStoredData(setters);
			let newBaseball = {...defaultBaseball};
			let storedDefault = await storeBasedOnPlatform('get', 'defaultData');
			storedDefault = JSON.parse(storedDefault);
			if (storedDefault?.baseball) newBaseball = {...newBaseball, ...storedDefault.baseball};
			setDefaultBaseball(newBaseball);
		};
		API.herokuWakeup();
		checkIfLoggedIn();
		checkStorageWithoutLogin();
	}, []);


	const loginUser = async (token) => {
		const userData = jwt_decode(token)?.user || jwt_decode(token);
		setUser(userData);
		API.token = token;
		await storeBasedOnPlatform('store', "token", token);
		const setters = {setOrganization, setSeason, setGame};
		await checkStorageOnLogin(setters);
	};

	const logoutUser = async () => {
		setUser(null);
		API.token = '';
		await storeBasedOnPlatform('remove', "token");
		setGame(null);
		setOrganization(null);
		setSeason(null);
	};

	const resetGame = () => {
		setApiErrors({});
		resetScore();
		resetGameData();
		resetBaseballData();
		clearTime();
	};

	const submitScores = async () => {
		setApiErrors({});
		const dataToSubmit = {game: {
			team1Score: score.homeScore,
			team2Score: score.awayScore
		}};
		try {
			await API.submitScore(organization.orgId, season.seasonId, game.gameId, dataToSubmit);
			resetGame();
			await storeBasedOnPlatform('remove', 'game');
			setGame(null);
			return true;
		} catch (err) {
            getApiErrors(err);
			return false;
        };
	};


	return (
		<NavigationContainer>
			<UserContext.Provider value={user}>
			<GameContext.Provider value={{organization, setOrganization,
											season, setSeason,
											game, setGame}}>
			<GameDataContext.Provider value={{gameData, changePossession, incrementDown, 
											setGameData, resetGame, manualDataChange}}>
			<ScoreContext.Provider value={{score, incrementScore, manualSetScore}}>
			<LoginContext.Provider value={{loginUser, logoutUser}}>
			<BaseballContext.Provider value={{baseballData, incrementBalls, incrementStrikes, 
										incrementOuts, setBaseballData, resetGame, manualBaseballChange}}>
			<TimeContext.Provider value={{time, setTime, saveTime}}>
			<SportyContext.Provider value={{submitScores, apiErrors}}>
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen name='Home' component={Home}
											options={{header: () => <Header title={'Home'} />}} />
					<Stack.Screen name='Game' component={Game}
											options={{header: ({route}) => <Header title={route.params.title} />}} />
					<Stack.Screen name='Baseball' component={Baseball}
											options={{header: () => <Header title={'Baseball'} />}} />
					<Stack.Screen name='Login' component={Login}
											options={{header: () => <Header title={'Log In'} />}} />
					<Stack.Screen name='Select' component={Select}
											options={{header: () => <Header title={'Change Information'} />}} />
					<Stack.Screen name='Settings' component={Settings}
											options={{header: () => <Header title={'Edit Default Settings'} />}} />
				</Stack.Navigator>
			</SportyContext.Provider>
			</TimeContext.Provider>
			</BaseballContext.Provider>
			</LoginContext.Provider>
			</ScoreContext.Provider>
			</GameDataContext.Provider>
			</GameContext.Provider>
			</UserContext.Provider>
		</NavigationContainer>
	);
};
