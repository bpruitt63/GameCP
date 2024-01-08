import React, {useState, useContext, useEffect} from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import { appStyles } from '../styles/appStyles';
import { gameScreenStyles } from '../styles/gameScreenStyles';
import { storeBasedOnPlatform } from '../helpersAndData/helpers';
import { useSettings } from '../helpersAndData/hooks';
import TeamSide from './TeamSide';
import Possession from './Possession';
import Down from './Down';
import { GameContext, GameDataContext, TimeContext, SportyContext } from '../context';
import Timer from './Timer';
import GameScreenBottom from './GameScreenBottom';
import Errors from '../Errors';


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
    const {submitScores, apiErrors, setApiErrors} = useContext(SportyContext);
    const {height, width} = useWindowDimensions();
    const [portrait, setPortrait] = useState(height > Math.min(width, 900));

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
        setPortrait(height > Math.min(width, 900));
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
            setApiErrors({successMessage: 'Game Submitted'});
			setTimeout(() => {
				setApiErrors({});
			}, 2000);
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
            <GameScreenBottom game={game}
                                gameOver={time?.gameOver}
                                resetOpen={resetOpen}
                                setResetOpen={setResetOpen}
                                fullReset={fullReset}
                                submitAndReset={submitAndReset}
                                portrait={portrait}
                                apiErrors={apiErrors}
                                sport={sport} />
        </View>
    );
};

export default Game;