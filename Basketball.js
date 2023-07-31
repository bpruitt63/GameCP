import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import TeamSide from './TeamSide';
import Possession from './Possession';
import { GameContext, GameDataContext } from './context';

function Basketball() {

    const scoreIntervals = [1, 2, 3];
    const [homeTeam, setHomeTeam] = useState({name: 'Home', position: 'home'});
    const [awayTeam, setAwayTeam] = useState({name: 'Away', position: 'away'});
    const {game} = useContext(GameContext);
    const {resetGame} = useContext(GameDataContext);

    useEffect(() => {
        if (game) {
            setHomeTeam({...homeTeam, name: game.team1Name});
            setAwayTeam({...awayTeam, name: game.team2Name});
        };
    }, [setHomeTeam, setAwayTeam, game]);

    return (
        <View>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={homeTeam}
                        sport='basketball' />
            <Text>Timer goes here</Text>
            <Possession />
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam}
                        sport='basketball' />
            <Button title='Reset Data'
                    onPress={resetGame} />
        </View>
    );
};

export default Basketball;