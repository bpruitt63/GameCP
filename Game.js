import React, {useState, useContext, useEffect} from 'react';
import {View, Button} from 'react-native';
import { storeBasedOnPlatform } from './helpers';
import { defaultData } from './defaultData';
import TeamSide from './TeamSide';
import Possession from './Possession';
import Down from './Down';
import { GameContext, GameDataContext } from './context';
import Timer from './Timer';

function Game({route}) {

    const {sport} = route.params;
    const [defaultValues, setDefaultValues] = useState(defaultData[sport]);
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
        setDefaultValues({...defaultData[sport]});
        storeBasedOnPlatform('store', 'time', JSON.stringify(defaultData[sport]));
    };

    return (
        <View>
            <TeamSide scoreIntervals={defaultValues.scoreIntervals}
                        team={homeTeam}
                        sport={sport} />
            <Timer defaultValues={defaultValues}
                    sport={sport} />
            <Possession />
            {sport === 'football' &&
                <Down />}
            <TeamSide scoreIntervals={[...defaultValues.scoreIntervals].reverse()}
                        team={awayTeam}
                        sport={sport} />
            <Button title='Reset Data'
                    onPress={fullReset} />
        </View>
    );
};

export default Game;