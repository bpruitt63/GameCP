import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Timer from './Timer';
import TeamSide from './TeamSide';
import Possession from './Possession';
import { GameContext, GameDataContext } from './context';

function Soccer() {

    const defaultValues = {minutes: 20, seconds: 0, centiseconds: 0, periods: 2};
    const scoreIntervals = [1];
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
            {/* <Timer defaultValues={defaultValues} /> */}
            <TeamSide scoreIntervals={scoreIntervals}
                        team={homeTeam}
                        sport='soccer' />
            <Text>Timer goes here</Text>
            <Possession />
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam}
                        sport='soccer' />
            <Button title='Reset Data'
                    onPress={resetGame} />
        </View>
    );
};

export default Soccer;