import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwt_decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { ScoreContext, UserContext, LoginContext } from './context';
import { useIncrementScore } from './hooks';
import Home from './Home';
import Soccer from './Soccer';
import Football from './Football';
import Basketball from './Basketball';
import Login from './Login';

const Stack = createNativeStackNavigator();

export default function App() {

	const [score, incrementScore, setScore] = useIncrementScore();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const checkIfLoggedIn = async () => {console.log(Platform.OS);
			const storedToken = await SecureStore.getItemAsync("token");
			if (storedToken) loginUser(storedToken);
		};
		checkIfLoggedIn();
	}, []);

	const loginUser = async (token) => {
		const userData = jwt_decode(token)?.user || jwt_decode(token);
		setUser(userData);
		await SecureStore.setItemAsync("token", token);
	};

	const logoutUser = async () => {
		setUser(null);
		await SecureStore.deleteItemAsync("token");
	};

	return (
		<NavigationContainer>
			<UserContext.Provider value={user}>
			<ScoreContext.Provider value={{score, incrementScore, setScore}}>
			<LoginContext.Provider value={{loginUser, logoutUser}}>
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Soccer' component={Soccer} />
					<Stack.Screen name='Football' component={Football} />
					<Stack.Screen name='Basketball' component={Basketball} />
					<Stack.Screen name='Login' component={Login} />
				</Stack.Navigator>
			</LoginContext.Provider>
			</ScoreContext.Provider>
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
