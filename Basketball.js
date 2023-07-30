import React, {useState, useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import TeamSide from './TeamSide';
import Possession from './Possession';
import { GameContext } from './context';

function Basketball() {

    const scoreIntervals = [1, 2, 3];
    const [homeTeam, setHomeTeam] = useState({name: 'Home', position: 'home'});
    const [awayTeam, setAwayTeam] = useState({name: 'Away', position: 'away'});
    const {game} = useContext(GameContext);

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
        </View>
    );
};

export default Basketball;