import React, {useState, useContext, useEffect} from 'react';
import {View, Button} from 'react-native';
import { storeBasedOnPlatform } from './helpers';
import TeamSide from './TeamSide';
import Possession from './Possession';
import Down from './Down';
import { GameContext, GameDataContext } from './context';
import Timer from './Timer';

function Football() {

    const defaultTime = {minutes: 12, seconds: 0, periods: 4, sport: 'football'};
    const [defaultValues, setDefaultValues] = useState(defaultTime);
    const scoreIntervals = [1, 2, 3, 6];
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

    const fullReset = () => {
        resetGame();
        setDefaultValues({...defaultTime});
        storeBasedOnPlatform('store', 'time', JSON.stringify(defaultTime));
    };

    return (
        <View>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={homeTeam}
                        sport='football' />
            <Timer defaultValues={defaultValues} />
            <Possession />
            <Down />
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam}
                        sport='football' />
            <Button title='Reset Data'
                    onPress={fullReset} />
        </View>
    );
};

export default Football;