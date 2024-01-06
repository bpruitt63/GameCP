import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { gameScreenStyles } from "../styles/gameScreenStyles";
import { appStyles } from "../styles/appStyles";
import SubmitScores from "./SubmitScores";

function GameScreenBottom({game, data, resetOpen, setResetOpen, fullReset, submitAndReset, portrait, apiErrors, sport}) {

    return (
        <View style={portrait ? [gameScreenStyles.resetContainer, sport === 'baseball' ? {paddingTop: 5, paddingBottom: 5} : ''] : gameScreenStyles.resetContainerLandscape}>
            {console.log({data})}
            {game && data && data.gameOver &&
                <SubmitScores submitScores={submitAndReset}
                                apiErrors={apiErrors}
                                buttonStyle={portrait ? gameScreenStyles.underTimerChild : [gameScreenStyles.resetButtonLandscape, resetOpen ? '' : {maxHeight: '40%', marginBottom: '60%'}]}
                                textStyle={portrait ? appStyles.text : [appStyles.text, appStyles.textLandscape]} />}
            {resetOpen ?
                <>
                    <TouchableOpacity onPress={() => setResetOpen(false)}
                                        style={portrait ? gameScreenStyles.underTimerChild : gameScreenStyles.resetButtonLandscape}>
                        <Text style={portrait ? appStyles.text : [appStyles.text, appStyles.textLandscape]}>Cancel Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fullReset}
                                    style={portrait ? gameScreenStyles.underTimerChild : gameScreenStyles.resetButtonLandscape}>
                        <Text style={portrait ? appStyles.text : [appStyles.text, appStyles.textLandscape]}>Confirm Reset</Text>
                    </TouchableOpacity>
                </>
            :
                <TouchableOpacity onPress={() => setResetOpen(true)}
                                style={portrait ? gameScreenStyles.underTimerChild : [gameScreenStyles.resetButtonLandscape, {maxHeight: '40%', marginBottom: '60%'}]}>
                    <Text style={portrait ? appStyles.text : [appStyles.text, appStyles.textLandscape]}>Reset Data</Text>  
                </TouchableOpacity>}
        </View>
    );
};

export default GameScreenBottom;