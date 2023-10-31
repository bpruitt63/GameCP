import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions, StyleSheet} from 'react-native';
import { appStyles } from './styles/appStyles';
import { gameScreenStyles } from './styles/gameScreenStyles';
import { storeBasedOnPlatform } from './helpers';
import { useSettings } from './hooks';
import TeamSide from './TeamSide';
import Possession from './Possession';
import Down from './Down';
import { GameContext, GameDataContext, TimeContext, SportyContext } from './context';
import Timer from './Timer';
import SubmitScores from './SubmitScores';
import Errors from './Errors';


function Game({route}) {

    const {sport} = route.params;
    const [getStoredDefaults, defaultValues, setDefaultValues] = useSettings(sport);
    const defaultHome = {name: 'Home', position: 'home', color: 'N/A'};
    const defaultAway = {name: 'Away', position: 'away', color: 'N/A'};
    const [homeTeam, setHomeTeam] = useState(defaultHome);
    const [awayTeam, setAwayTeam] = useState(defaultAway);
    const [resetOpen, setResetOpen] = useState(false);
    const {game} = useContext(GameContext);
    const {resetGame} = useContext(GameDataContext);
    const {time} = useContext(TimeContext);
    const {submitScores, apiErrors} = useContext(SportyContext);
    const {height, width} = useWindowDimensions();
    const [portrait, setPortrait] = useState(height > width);

    const errorStyle = StyleSheet.compose(appStyles.errors, appStyles.sportyError);

    useEffect(() => {
        const setDefaults = async () => {
            if (game) {
                setHomeTeam({...homeTeam, name: game.team1Name, color: game.team1Color});
                setAwayTeam({...awayTeam, name: game.team2Name, color: game.team2Color});
            };
            const newDefaultValues = await getStoredDefaults(sport);
            setDefaultValues(newDefaultValues);
        };
        setDefaults();
    }, [setHomeTeam, setAwayTeam, game, setDefaultValues]);

    useEffect(() => {
        setPortrait(height > width);
    }, [height, width]);

    const fullReset = async () => {
        resetGame();
        const newDefaults = await getStoredDefaults(sport);
        setDefaultValues(newDefaults);
        storeBasedOnPlatform('store', 'time', JSON.stringify(newDefaults));
        setResetOpen(false);
    };

    const submitAndReset = async () => {
        const success = await submitScores();
        if (success) {
            setHomeTeam(defaultHome);
            setAwayTeam(defaultAway);
        };
    };

    return (
        <View style={portrait ? appStyles.app : appStyles.landscape}>
            <TeamSide scoreIntervals={defaultValues.scoreIntervals}
                        team={homeTeam}
                        sport={sport}
                        portrait={portrait} />
            <View style={portrait ? gameScreenStyles.center : gameScreenStyles.centerLandscape}>
                <Timer defaultValues={defaultValues}
                        sport={sport}
                        textStyle={appStyles.text} />
                <View style={gameScreenStyles.underTimer}>
                    <Possession mainStyle={gameScreenStyles.underTimerChild}
                                textStyle={appStyles.text} />
                    {sport === 'football' &&
                        <Down mainStyle={gameScreenStyles.underTimerChild}
                            textStyle={appStyles.text} />}
                </View>
            </View>
            <TeamSide scoreIntervals={defaultValues.scoreIntervals}
                        team={awayTeam}
                        sport={sport}
                        portrait={portrait} />
            {Object.keys(apiErrors)[0] &&
                <Errors apiErrors={apiErrors}
                        viewStyles={errorStyle}
                        textStyles={appStyles.errorText} />}
            <View style={portrait ? gameScreenStyles.resetContainer : gameScreenStyles.resetContainerLandscape}>
                {game && time && time.gameOver &&
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
        </View>
    );
};

export default Game;