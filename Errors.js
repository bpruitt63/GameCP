import React from 'react';
import {View, Text} from 'react-native';


function Errors({formErrors={}, apiErrors={}}) {
    return (
        <View>
            {Object.keys(formErrors).map((key, e) => 
                <Text style={{color: 'white'}}
                    key={e}>{formErrors[key]}</Text>)}
            {Object.keys(apiErrors).map((key, e) => 
                <Text key={e}>{apiErrors[key]}</Text>)}
        </View>
    )
};

export default Errors;