import React, {useState, useContext, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import TeamSide from './TeamSide';
import { BaseballContext, GameContext, ScoreContext } from './context';

function Baseball() {

    const scoreIntervals = [1];
    const [homeTeam, setHomeTeam] = useState({name: 'Home', position: 'home'});
    const [awayTeam, setAwayTeam] = useState({name: 'Away', position: 'away'});
    const {game} = useContext(GameContext);
    const {baseballData, incrementBalls, incrementStrikes, incrementOuts, 
            setBaseballData, resetGame} = useContext(BaseballContext);
    const {score} = useContext(ScoreContext);

    useEffect(() => {
        if (game) {
            setHomeTeam({...homeTeam, name: game.team1Name});
            setAwayTeam({...awayTeam, name: game.team2Name});
        };
    }, [setHomeTeam, setAwayTeam, game]);

    return (
        <View>
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