import React, {useState, useContext, useEffect} from 'react';
import {View, Button} from 'react-native';
import { storeBasedOnPlatform } from './helpers';
import TeamSide from './TeamSide';
import Possession from './Possession';
import { GameContext, GameDataContext } from './context';
import Timer from './Timer';

function Basketball() {

    const defaultTime = {minutes: 8, seconds: 0, periods: 4, sport: 'basketball'};
    const [defaultValues, setDefaultValues] = useState(defaultTime);
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

    const fullReset = () => {
        resetGame();
        setDefaultValues({...defaultTime});
        storeBasedOnPlatform('store', 'time', JSON.stringify(defaultTime));
    };

    return (
        <View>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={homeTeam}
                        sport='basketball' />
            <Timer defaultValues={defaultValues} />
            <Possession />
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam}
                        sport='basketball' />
            <Button title='Reset Data'
                    onPress={fullReset} />
        </View>
    );
};

export default Basketball;