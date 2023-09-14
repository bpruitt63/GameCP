import React, {useState, useContext, useEffect} from 'react';
import {View, Button} from 'react-native';
import { storeBasedOnPlatform } from './helpers';
import { useSettings } from './hooks';
//import { defaultData } from './defaultData';
import TeamSide from './TeamSide';
import Possession from './Possession';
import Down from './Down';
import { GameContext, GameDataContext, TimeContext, SportyContext } from './context';
import Timer from './Timer';
import SubmitScores from './SubmitScores';


function Game({route}) {

    const {sport} = route.params;
    const [defaultValues, getStoredDefaults, setDefaultValues] = useSettings(sport);
    const defaultHome = {name: 'Home', position: 'home'};
    const defaultAway = {name: 'Away', position: 'away'};
    const [homeTeam, setHomeTeam] = useState(defaultHome);
    const [awayTeam, setAwayTeam] = useState(defaultAway);
    const {game} = useContext(GameContext);
    const {resetGame} = useContext(GameDataContext);
    const {time} = useContext(TimeContext);
    const {submitScores, apiErrors} = useContext(SportyContext);

    useEffect(() => {
        const setDefaults = async () => {
            if (game) {
                setHomeTeam({...homeTeam, name: game.team1Name});
                setAwayTeam({...awayTeam, name: game.team2Name});
            };
            const newDefaultValues = await getStoredDefaults(sport);
            setDefaultValues(newDefaultValues);
        };
        setDefaults();
    }, [setHomeTeam, setAwayTeam, game, setDefaultValues]);

    const fullReset = () => {
        resetGame();
        setDefaultValues(getStoredDefaults(sport));
        storeBasedOnPlatform('store', 'time', JSON.stringify(defaultData[sport]));
    };

    const submitAndReset = async () => {
        await submitScores();
        setHomeTeam(defaultHome);
        setAwayTeam(defaultAway);
    };

    return (
        <View>
            {game && time && time.gameOver &&
                <SubmitScores submitScores={submitAndReset}
                                apiErrors={apiErrors} />}
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