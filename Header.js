import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { headerStyles } from './styles/headerStyles';

function Header({title}) {

    const navigation = useNavigation();
    const goHome = () => navigation.navigate('Home');

    return (
        <View style={headerStyles.header}>
            <TouchableOpacity onPress={title === 'Home' ? null : goHome}>
                <Text style={headerStyles.headerButtonText}>GameCP</Text>
            </TouchableOpacity>
            <Text style={headerStyles.headerTitleText}>{title}</Text>
        </View>
    );
};

export default Header;