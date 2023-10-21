import React, {useContext} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import { appStyles } from './styles/appStyles';
import { GameContext, LoginContext, UserContext } from './context';


function Home({navigation}) {

        const user = useContext(UserContext);
        const {organization, season, game} = useContext(GameContext);
        const {logoutUser} = useContext(LoginContext);

    return (
        <View style={appStyles.app}>
            {user &&
                <Text style={appStyles.text}>Logged in as {`${user.firstName} ${user.lastName}`}</Text>}
            {organization &&
                <Text style={appStyles.text}>Current organization: {organization.orgName}</Text>}
            {season &&
                <Text style={appStyles.text}>Current season: {season.title}</Text>}
            {game &&
                <Text style={appStyles.text}>Current game: {game.title}</Text>}
            <Text style={appStyles.text}>Select a sport</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Game', {sport: 'basketball', title: 'Basketball'})}>
                <Text style={appStyles.text}>Basketball</Text>    
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Game', {sport: 'football', title: 'Football'})}>
                <Text style={appStyles.text}>Football</Text>    
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Game', {sport: 'soccer', title: 'Soccer'})}>
                <Text style={appStyles.text}>Soccer</Text>    
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Baseball')}>
                <Text style={appStyles.text}>Baseball</Text>    
            </TouchableOpacity>
            <Text style={appStyles.text}>Or</Text>
            {user ? 
                <>
					<TouchableOpacity onPress={() => navigation.navigate('Select')}>
                        <Text style={appStyles.text}>Select or Change Game</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logoutUser}>
                        <Text style={appStyles.text}>Log Out</Text>    
                    </TouchableOpacity>
                </>
                :
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={appStyles.text}>Log in to Sporty</Text>
                </TouchableOpacity> 
        	}
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={appStyles.text}>Set Defaults</Text>
            </TouchableOpacity> 
        </View>
    );
};

export default Home;