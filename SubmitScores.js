import React from 'react';
import { Button } from 'react-native';
import Errors from './Errors';

function SubmitScores({submitScores, apiErrors}) {

    return (
        <>
            <Button title='Save to Sporty'
                    onPress={submitScores} />
            <Errors apiErrors={apiErrors} />
        </>
    );
};

export default SubmitScores;