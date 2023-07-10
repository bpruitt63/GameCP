import React, {useContext} from 'react';
import {Button, View, Text} from 'react-native';
import { LoginContext, UserContext } from './context';


function Home({navigation}) {

        const user = useContext(UserContext);
        const {logoutUser} = useContext(LoginContext);

    return (
        <View>
            {user &&
                <Text>Logged in as {`${user.firstName} ${user.lastName}`}</Text>}
            <Text>Select a sport</Text>
            <Button title='Basketball'
                    onPress={() => navigation.navigate('Basketball')} />
            <Button title='Football'
                    onPress={() => navigation.navigate('Football')} />
            <Button title='Soccer'
                    onPress={() => navigation.navigate('Soccer')} />
            <Text>Or</Text>
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
        </View>
    );
};

export default Home;