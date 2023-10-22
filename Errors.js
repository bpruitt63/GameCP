import React from 'react';
import {View, Text} from 'react-native';


function Errors({formErrors={}, apiErrors={}, viewStyles, textStyles}) {
    return (
        <View style={viewStyles}>
            {Object.keys(formErrors).map((key, e) => 
                <Text style={textStyles}
                    key={e}>{formErrors[key]}</Text>)}
            {Object.keys(apiErrors).map((key, e) => 
                <Text style={textStyles} 
                    key={e}>{apiErrors[key]}</Text>)}
        </View>
    )
};

export default Errors;