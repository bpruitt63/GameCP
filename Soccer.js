import React, {useState, useContext, useEffect} from 'react';
import {View, Button} from 'react-native';
import { storeBasedOnPlatform } from './helpers';
import Timer from './Timer';
import TeamSide from './TeamSide';
import Possession from './Possession';
import { GameContext, GameDataContext } from './context';

function Soccer() {

    const defaultTime = {minutes: 20, seconds: 0, periods: 2, sport: 'soccer'};
    const [defaultValues, setDefaultValues] = useState(defaultTime);
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

    const fullReset = () => {
        resetGame();
        setDefaultValues({...defaultTime});
        storeBasedOnPlatform('store', 'time', JSON.stringify(defaultTime));
    };

    return (
        <View>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={homeTeam}
                        sport='soccer' />
            <Timer defaultValues={defaultValues} />
            <Possession />
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam}
                        sport='soccer' />
            <Button title='Reset Data'
                    onPress={fullReset} />
        </View>
    );
};

export default Soccer;