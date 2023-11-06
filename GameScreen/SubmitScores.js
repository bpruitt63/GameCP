import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function SubmitScores({submitScores, buttonStyle, textStyle}) {

    return (
        <TouchableOpacity onPress={submitScores}
                        style={buttonStyle}>
            <Text style={textStyle}>Save to Sporty</Text>    
        </TouchableOpacity>
    );
};

export default SubmitScores;