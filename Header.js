import React from 'react';
import { View, Text, StatusBar } from 'react-native';

function Header({title}) {

    return (
        <View style={{backgroundColor: 'black', marginTop: StatusBar.currentHeight}}>
            <Text style={{color: 'white'}}>{title}</Text>
        </View>
    );
};

export default Header;