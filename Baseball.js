import React, {useState, useContext, useEffect} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import { useSettings } from './hooks';
import TeamSide from './TeamSide';
import { BaseballContext, GameContext, ScoreContext, SportyContext } from './context';
import SubmitScores from './SubmitScores';
import ManualBaseballForm from './ManualBaseballForm';

function Baseball() {

    const scoreIntervals = [1];
    const defaultHome = {name: 'Home', position: 'home'};
    const defaultAway = {name: 'Away', position: 'away'};
    const [homeTeam, setHomeTeam] = useState(defaultHome);
    const [awayTeam, setAwayTeam] = useState(defaultAway);
    const [formOpen, setFormOpen] = useState(false);
    const [getStoredDefaults, defaultValues, setDefaultValues] = useSettings(sport);
    const {game} = useContext(GameContext);
    const {baseballData, incrementBalls, incrementStrikes, incrementOuts, 
            resetGame, manualBaseballChange} = useContext(BaseballContext);
    const {score} = useContext(ScoreContext);
    const {submitScores, apiErrors} = useContext(SportyContext);
    const sport = 'baseball';

    useEffect(() => {
        const setDefaults = async () => {
            if (game) {
                setHomeTeam({...homeTeam, name: game.team1Name});
                setAwayTeam({...awayTeam, name: game.team2Name});
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
    };

    const save = (newData) => {
        const newBaseballData = {...baseballData, inning: +newData.inning, top: newData.top};
        manualBaseballChange(newBaseballData);
        setFormOpen(false);
    };

    const cancel = () => setFormOpen(false);

    return (
        <View>
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
                    <Text>Inning: {baseballData.top ? 'Top ' : 'Bottom '}
                            {baseballData.inning}</Text>
                </TouchableOpacity>}
            <Button title={`Balls: ${baseballData.balls}`}
                    onPress={incrementBalls} />
            <Button title={`Strikes: ${baseballData.strikes}`}
                    onPress={() => incrementStrikes(score)} />
            <Button title={`Outs: ${baseballData.outs}`}
                    onPress={() => incrementOuts(score)} />
            <Button title='Reset Data'
                    onPress={fullReset} />
        </View>
    );
};

export default Baseball;