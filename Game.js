import React, {useState, useContext, useEffect} from 'react';
import {View, Button} from 'react-native';
import { styles } from './styles';
import { storeBasedOnPlatform } from './helpers';
import { useSettings } from './hooks';
import TeamSide from './TeamSide';
import Possession from './Possession';
import Down from './Down';
import { GameContext, GameDataContext, TimeContext, SportyContext } from './context';
import Timer from './Timer';
import SubmitScores from './SubmitScores';


function Game({route}) {

    const {sport} = route.params;
    const [getStoredDefaults, defaultValues, setDefaultValues] = useSettings(sport);
    const defaultHome = {name: 'Home', position: 'home'};
    const defaultAway = {name: 'Away', position: 'away'};
    const [homeTeam, setHomeTeam] = useState(defaultHome);
    const [awayTeam, setAwayTeam] = useState(defaultAway);
    const [resetOpen, setResetOpen] = useState(false);
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

    const fullReset = async () => {
        resetGame();
        const newDefaults = await getStoredDefaults(sport);
        setDefaultValues(newDefaults);
        storeBasedOnPlatform('store', 'time', JSON.stringify(newDefaults));
        setResetOpen(false);
    };

    const submitAndReset = async () => {
        await submitScores();
        setHomeTeam(defaultHome);
        setAwayTeam(defaultAway);
    };

    return (
        <View style={styles.app}>
            {game && time && time.gameOver &&
                <SubmitScores submitScores={submitAndReset}
                                apiErrors={apiErrors} />}
            <TeamSide scoreIntervals={defaultValues.scoreIntervals}
                        team={homeTeam}
                        sport={sport}
                        textStyle={styles.text} />
            <Timer defaultValues={defaultValues}
                    sport={sport}
                    textStyle={styles.text} />
            <Possession />
            {sport === 'football' &&
                <Down textStyle={styles.text} />}
            <TeamSide scoreIntervals={[...defaultValues.scoreIntervals].reverse()}
                        team={awayTeam}
                        sport={sport}
                        textStyle={styles.text} />
            {resetOpen ?
                    <>
                        <Button title='Confirm Reset'
                                onPress={fullReset} />
                        <Button title='Cancel Reset'
                                onPress={() => setResetOpen(false)} />
                    </>
                :
                    <Button title='Reset Data'
                        onPress={() => setResetOpen(true)} />}
        </View>
    );
};

export default Game;