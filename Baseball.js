import React, {useState, useContext, useEffect} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import { appStyles } from './styles';
import { useSettings } from './hooks';
import { storeBasedOnPlatform } from './helpers';
import TeamSide from './TeamSide';
import { BaseballContext, GameContext, ScoreContext, SportyContext } from './context';
import Score from './Score';
import SubmitScores from './SubmitScores';
import ManualBaseballForm from './ManualBaseballForm';

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

    const submitAndReset = async () => {
        await submitScores();
        setHomeTeam(defaultHome);
        setAwayTeam(defaultAway);
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
        <View style={appStyles.app}>
            {game && baseballData && baseballData.gameOver &&
                <SubmitScores submitScores={submitAndReset}
                                apiErrors={apiErrors} />}
            <TeamSide scoreIntervals={scoreIntervals}
                        team={baseballData.top ? awayTeam : homeTeam}
                        sport='baseball' />
            {formOpen ?
                <ManualBaseballForm initialValue={{inning: baseballData.inning, top: baseballData.top}}
                                    save={save} 
                                    cancel={cancel} />
            :
                <TouchableOpacity onLongPress={() => setFormOpen(true)}>
                    <Text style={appStyles.text}>Inning: {baseballData.top ? 'Top ' : 'Bottom '}
                            {baseballData.inning}</Text>
                </TouchableOpacity>}
            <Button title={`Balls: ${baseballData.balls}`}
                    onPress={incrementBalls} />
            <Button title={`Strikes: ${baseballData.strikes}`}
                    onPress={() => incrementStrikes(score)} />
            <Button title={`Outs: ${baseballData.outs}`}
                    onPress={() => incrementOuts(score)} />
            {resetOpen ? 
                    <>
                        <Button title='Confirm Reset'
                                onPress={fullReset} />
                        <Button title='Cancel Reset'
                                onPress={() => setResetOpen(false)} />
                    </>
                :
                    <Button title='Reset Data'
                        onPress={() => setResetOpen(true)} />}
            <Text style={appStyles.text}>{baseballData.top ? homeTeam.name : awayTeam.name}</Text>
            <Score score={score}
                    position={baseballData.top ? 'home' : 'away'}
                    manualSetScore={manualSetScore}
                    textStyle={appStyles.text} />
        </View>
    );
};

export default Baseball;