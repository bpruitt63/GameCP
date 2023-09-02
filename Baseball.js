import React, {useState, useContext, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import TeamSide from './TeamSide';
import { BaseballContext, GameContext, ScoreContext, SportyContext } from './context';
import SubmitScores from './SubmitScores';

function Baseball() {

    const scoreIntervals = [1];
    const defaultHome = {name: 'Home', position: 'home'};
    const defaultAway = {name: 'Away', position: 'away'};
    const [homeTeam, setHomeTeam] = useState(defaultHome);
    const [awayTeam, setAwayTeam] = useState(defaultAway);
    const {game} = useContext(GameContext);
    const {baseballData, incrementBalls, incrementStrikes, incrementOuts, 
            setBaseballData, resetGame} = useContext(BaseballContext);
    const {score} = useContext(ScoreContext);
    const {submitScores, apiErrors} = useContext(SportyContext);

    useEffect(() => {
        if (game) {
            setHomeTeam({...homeTeam, name: game.team1Name});
            setAwayTeam({...awayTeam, name: game.team2Name});
        };
    }, [setHomeTeam, setAwayTeam, game]);

    const submitAndReset = async () => {
        await submitScores();
        setHomeTeam(defaultHome);
        setAwayTeam(defaultAway);
    };

    return (
        <View>
            {game && baseballData && baseballData.gameOver &&
                <SubmitScores submitScores={submitAndReset}
                                apiErrors={apiErrors} />}
            <TeamSide scoreIntervals={scoreIntervals}
                        team={baseballData.top ? awayTeam : homeTeam}
                        sport='baseball' />
            <Text>Inning: {baseballData.top ? 'Top ' : 'Bottom '}
                            {baseballData.inning}</Text>
            <Button title={`Balls: ${baseballData.balls}`}
                    onPress={incrementBalls} />
            <Button title={`Strikes: ${baseballData.strikes}`}
                    onPress={() => incrementStrikes(score)} />
            <Button title={`Outs: ${baseballData.outs}`}
                    onPress={() => incrementOuts(score)} />
            <Button title='Reset Data'
                    onPress={resetGame} />
        </View>
    );
};

export default Baseball;