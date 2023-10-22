import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { menuStyles } from './styles/menuStyles';

function SelectList({data, press, textStyle}) {

    const containerStyle = StyleSheet.compose(menuStyles.menuSection, menuStyles.selectList);

    return (
        <View style={containerStyle}>
            {data.map(d => 
                <TouchableOpacity key={d[0]}
                                onPress={() => press(d[0])}
                                style={[menuStyles.menuButton, {marginBottom: 20}]}>
                    <Text style={textStyle}>{d[1]}</Text>
                </TouchableOpacity>)}
        </View>
    );
};

export default SelectList;