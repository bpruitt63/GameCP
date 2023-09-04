import React, { useState, useEffect } from 'react';
//import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwt_decode from 'jwt-decode';
import { ScoreContext, UserContext, LoginContext, 
		GameContext, GameDataContext, BaseballContext,
		TimeContext, SportyContext } from './context';
import { useTimer, useIncrementScore, useGameData, useBaseball, useErrors } from './hooks';
import { storeBasedOnPlatform, checkStorageOnLogin } from './helpers';
import Home from './Home';
import Game from './Game';
import Baseball from './Baseball';
import Login from './Login';
import Select from './Select';
import API from './Api';

const Stack = createNativeStackNavigator();

export default function App() {

	const [time, clearTime, saveTime, setTime] = useTimer();
	const [score, incrementScore, setScore, resetScore, manualSetScore] = useIncrementScore();
	const [gameData, changePossession, incrementDown, setGameData, resetGameData, manualDataChange] = useGameData();
	const [baseballData, incrementBalls, incrementStrikes, incrementOuts, setBaseballData, resetBaseballData] = useBaseball();
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
		API.herokuWakeup();
		checkIfLoggedIn();
	}, []);


	const loginUser = async (token) => {
		const userData = jwt_decode(token)?.user || jwt_decode(token);
		setUser(userData);
		API.token = token;
		await storeBasedOnPlatform('store', "token", token);
		const setters = {setOrganization, setSeason, setGame, setScore, setGameData, setBaseballData, setTime};
		await checkStorageOnLogin(setters);
	};

	const logoutUser = async () => {
		setUser(null);
		API.token = '';
		await storeBasedOnPlatform('remove', "token");
		setTime(null);
		setScore({homeScore: 0, awayScore: 0});
		setGame(null);
		setGameData({possession: 'home', down: 1});
		setBaseballData(null);
		setOrganization(null);
		setSeason(null);
	};

	const resetGame = () => {
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
		} catch (err) {
            getApiErrors(err);
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
										incrementOuts, setBaseballData, resetGame}}>
			<TimeContext.Provider value={{time, setTime, saveTime}}>
			<SportyContext.Provider value={{submitScores, apiErrors}}>
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Game' component={Game} />
					<Stack.Screen name='Baseball' component={Baseball} />
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Select' component={Select} />
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

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });
