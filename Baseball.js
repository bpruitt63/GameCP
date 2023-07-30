import React, {useState, useContext, useEffect} from 'react';
import {View} from 'react-native';
import TeamSide from './TeamSide';
import { GameContext } from './context';

function Baseball() {

    const scoreIntervals = [1, 2, 3, 6];
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
                        team={homeTeam} />
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam} />
        </View>
    );
};

export default Baseball;