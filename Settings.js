import React, {useState} from 'react';
import { Text, View } from 'react-native';
import { defaultData } from './defaultData';
import { storeBasedOnPlatform } from './helpers';

function Settings() {

    return (
        <View>
            {console.log(defaultData)}
        </View>
    );
};

export default Settings;