import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Errors from './Errors';

function SubmitScores({submitScores, apiErrors, buttonStyle, textStyle}) {

    return (
        <>
            <TouchableOpacity onPress={submitScores}
                            style={buttonStyle}>
                <Text style={textStyle}>Save to Sporty</Text>    
            </TouchableOpacity>
            <Errors apiErrors={apiErrors} />
        </>
    );
};

export default SubmitScores;