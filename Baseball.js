import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions, StyleSheet} from 'react-native';
import { appStyles } from './styles/appStyles';
import { gameScreenStyles } from './styles/gameScreenStyles';
import { baseballStyles } from './styles/baseballStyles';
import { teamColorStyles } from './styles/teamColorStyles';
import { useSettings } from './hooks';
import { storeBasedOnPlatform } from './helpers';
import TeamSide from './TeamSide';
import { BaseballContext, GameContext, ScoreContext, SportyContext } from './context';
import Score from './Score';
import ManualBaseballForm from './ManualBaseballForm';
import GameScreenBottom from './GameScreenBottom';
import Errors from './Errors';

function Baseball() {

    const scoreIntervals = [1];
    const defaultHome = {name: 'Home', position: 'home', color: 'N/A'};
    const defaultAway = {name: 'Away', position: 'away', color: 'N/A'};
    const [homeTeam, setHomeTeam] = useState(defaultHome);
    const [awayTeam, setAwayTeam] = useState(defaultAway);
    const [formOpen, setFormOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);
    const [getStoredDefaults, defaultValues, setDefaultValues] = useSettings(sport);
    const {game} = useContext(GameContext);
    const {baseballData, incrementBalls, incrementStrikes, incrementOuts, setBaseballData,
            resetGame, manualBaseballChange} = useContext(BaseballContext);
    const {score, manualSetScore} = useContext(ScoreContext);
    const {submitScores, apiErrors} = useContext(SportyContext);
    const sport = 'baseball';
    const {height, width} = useWindowDimensions();
    const [portrait, setPortrait] = useState(height > width);

    const team = baseballData.top ? homeTeam : awayTeam;
    const colorStyle = team.color === 'N/A' ? teamColorStyles.NA : teamColorStyles[team.color];
    const fieldingTeamStyle = [gameScreenStyles.teamNameParent, {height: '6%'}, colorStyle];
    const fieldingTeamText = team.color === 'N/A' ? teamColorStyles.NAText : teamColorStyles[`${team.color}Text`];

    const errorStyle = StyleSheet.compose(appStyles.errors, appStyles.sportyError);

    useEffect(() => {
        const setDefaults = async () => {
            if (game) {
                setHomeTeam({...homeTeam, name: game.team1Name, color: game.team1Color});
                setAwayTeam({...awayTeam, name: game.team2Name, color: game.team2Color});
            };
            const newDefaultValues = await getStoredDefaults(sport);
            setDefaultValues(newDefaultValues);
            setFormOpen(false);
        };
        setDefaults();
    }, [setHomeTeam, setAwayTeam, game, baseballData]);

    useEffect(() => {
        setPortrait(height > width);
    }, [height, width]);

    const submitAndReset = async () => {
        const success = await submitScores();
        if (success) {
            setHomeTeam(defaultHome);
            setAwayTeam(defaultAway);
        };
    };

    const fullReset = async () => {
        resetGame();
        const newDefaults = await getStoredDefaults(sport);
        setDefaultValues(newDefaults);
        storeBasedOnPlatform('store', 'baseballData', JSON.stringify(newDefaults));
        setResetOpen(false);
    };

    const save = (newData) => {
        const newBaseballData = {...baseballData, inning: +newData.inning, top: newData.top};
        manualBaseballChange(newBaseballData);
        setFormOpen(false);
    };

    const cancel = () => setFormOpen(false);

    return (
        <View style={portrait ? appStyles.app : appStyles.landscape}>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={baseballData.top ? awayTeam : homeTeam}
                        sport='baseball'
                        portrait={portrait} />
            <View style={baseballStyles.incrementButtons}>
                {formOpen ?
                    <ManualBaseballForm initialValue={{inning: baseballData.inning, top: baseballData.top}}
                                        save={save} 
                                        cancel={cancel} />
                :
                    <TouchableOpacity onLongPress={() => setFormOpen(true)}
                                    style={baseballStyles.button}>
                        <Text style={appStyles.text}>Inning: {baseballData.top ? 'Top ' : 'Bottom '}
                                {baseballData.inning}</Text>
                    </TouchableOpacity>}
                <TouchableOpacity onPress={incrementBalls}
                                    style={baseballStyles.button}>
                    <Text style={appStyles.text}>{`Balls: ${baseballData.balls}`}</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => incrementStrikes(score)}
                                    style={baseballStyles.button}>
                    <Text style={appStyles.text}>{`Strikes: ${baseballData.strikes}`}</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => incrementOuts(score)}
                                    style={baseballStyles.button}>
                    <Text style={appStyles.text}>{`Outs: ${baseballData.outs}`}</Text>    
                </TouchableOpacity>
            </View>
            <View style={fieldingTeamStyle}>
                <Text style={[gameScreenStyles.teamName, fieldingTeamText]}
                        numberOfLines={2}>
                            {baseballData.top ? homeTeam.name : awayTeam.name}
                </Text>
                <Score score={score}
                        position={baseballData.top ? 'home' : 'away'}
                        manualSetScore={manualSetScore}
                        textStyle={fieldingTeamText}
                        teamScore={gameScreenStyles.teamScore} />
            </View>
            {Object.keys(apiErrors)[0] &&
                <Errors apiErrors={apiErrors}
                        viewStyles={errorStyle}
                        textStyles={appStyles.errorText} />}
            <GameScreenBottom game={game}
                                data={baseballData}
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

export default Baseball;