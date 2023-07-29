import React, { useState, useEffect } from 'react';
//import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwt_decode from 'jwt-decode';
//import * as SecureStore from 'expo-secure-store';
import { ScoreContext, UserContext, LoginContext, GameContext } from './context';
import { useIncrementScore, useGameData } from './hooks';
import { storeBasedOnPlatform } from './helpers';
import Home from './Home';
import Soccer from './Soccer';
import Football from './Football';
import Basketball from './Basketball';
import Login from './Login';
import Select from './Select';

const Stack = createNativeStackNavigator();

export default function App() {

	const [score, incrementScore, setScore] = useIncrementScore();
	const [gameData, changePossession, incrementDown, setGameData] = useGameData();
	const [user, setUser] = useState(null);
	const [organization, setOrganization] = useState(null);
	const [season, setSeason] = useState(null);
	const [game, setGame] = useState(null);

	useEffect(() => {
		const checkIfLoggedIn = async () => {
			const storedToken = await storeBasedOnPlatform('get', "token");
			if (storedToken) {
				await loginUser(storedToken);
				await getOrg();
				await getSeason();
				await getGame();
				await getScore();
			};
		};
		const getOrg = async () => {
			const storedOrg = await storeBasedOnPlatform('get', 'organization');
			if (storedOrg) setOrganization(JSON.parse(storedOrg));
		};
		const getSeason = async () => {
			const storedSeason = await storeBasedOnPlatform('get', 'season');
			if (storedSeason) setSeason(JSON.parse(storedSeason));
		};
		const getGame = async () => {
			const storedGame = await storeBasedOnPlatform('get', 'game');
			if (storedGame) setGame(JSON.parse(storedGame));
		};
		const getScore = async () => {
			const storedScore = await storeBasedOnPlatform('get', 'score');
			if (storedScore) setScore(JSON.parse(storedScore));
		};
		checkIfLoggedIn();
	}, []);

	// const storeBasedOnPlatform = async (operation, key, value=null) => {
	// 	const isWeb = Platform.OS === 'web';
	// 	switch (operation) {
	// 		case 'store':
	// 			return isWeb ? localStorage.setItem(key, value) 
	// 						: await SecureStore.setItemAsync(key, value);
	// 		case 'remove':
	// 			return isWeb ? localStorage.removeItem(key) 
	// 						: await SecureStore.deleteItemAsync(key);
	// 		case 'get':
	// 			return isWeb ? localStorage.getItem(key) 
	// 						: await SecureStore.getItemAsync(key);
	// 	};
	// };

	const loginUser = async (token) => {
		const userData = jwt_decode(token)?.user || jwt_decode(token);
		setUser(userData);
		await storeBasedOnPlatform('store', "token", token);
	};

	const logoutUser = async () => {
		setUser(null);
		await storeBasedOnPlatform('remove', "token");
	};

	return (
		<NavigationContainer>
			<UserContext.Provider value={user}>
			<GameContext.Provider value={{organization, setOrganization,
											season, setSeason,
											game, setGame}}>
			<ScoreContext.Provider value={{score, incrementScore, setScore}}>
			<LoginContext.Provider value={{loginUser, logoutUser}}>
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Soccer' component={Soccer} />
					<Stack.Screen name='Football' component={Football} />
					<Stack.Screen name='Basketball' component={Basketball} />
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Select' component={Select} />
				</Stack.Navigator>
			</LoginContext.Provider>
			</ScoreContext.Provider>
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
