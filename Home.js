import React, {useContext} from 'react';
import {Button, View, Text} from 'react-native';
import { appStyles } from './styles';
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
            <Button title='Basketball'
                    onPress={() => navigation.navigate('Game', {sport: 'basketball'})} />
            <Button title='Football'
                    onPress={() => navigation.navigate('Game', {sport: 'football'})} />
            <Button title='Soccer'
                    onPress={() => navigation.navigate('Game', {sport: 'soccer'})} />
            <Button title='Baseball'
                    onPress={() => navigation.navigate('Baseball')} />
            <Text style={appStyles.text}>Or</Text>
            {user ? 
                <>
					<Button title='Select or Change Game'
							onPress={() => navigation.navigate('Select')} />
                    <Button title='Log Out'
                    		onPress={logoutUser} />
                </>
                :
                <Button title='Log in to Sporty'
                   	 	onPress={() => navigation.navigate('Login')} />
        	}
            <Button title='Set Defaults'
                    onPress={() => navigation.navigate('Settings')} />
        </View>
    );
};

export default Home;