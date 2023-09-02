import React, { useContext } from 'react';
import { Button } from 'react-native';
import Errors from './Errors';
//import { SportyContext } from './context';

function SubmitScores({submitScores, apiErrors}) {

    //const {submitScores, apiErrors} = useContext(SportyContext);

    return (
        <>
            <Button title='Save to Sporty'
                    onPress={submitScores} />
            <Errors apiErrors={apiErrors} />
        </>
    );
};

export default SubmitScores;