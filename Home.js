import React from 'react';
import {Button, View, Text} from 'react-native';


function Home({navigation}) {

    return (
        <View>
            <Text>Select a sport</Text>
            <Button title='Basketball'
                    onPress={() => navigation.navigate('Basketball')} />
            <Button title='Football'
                    onPress={() => navigation.navigate('Football')} />
            <Button title='Soccer'
                    onPress={() => navigation.navigate('Soccer')} />
            <Text>Or</Text>
            <Button title='Log in to Sporty'
                    onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

export default Home;