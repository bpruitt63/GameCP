import {useState, useCallback} from 'react';
import { storeBasedOnPlatform } from './helpers';
import { defaultData } from './defaultData';


function useTimer(timerData=null) {

    const [time, setTime] = useState(timerData);

    const clearTime = () => {
        setTime(null);
        storeBasedOnPlatform('remove', 'time');
    };

    const saveTime = (timeToSave) => {
        setTime(timeToSave);
        storeBasedOnPlatform('store', 'time', JSON.stringify(timeToSave));
    };

    return [time, clearTime, saveTime, setTime];
};


function useIncrementScore(initialState={homeScore: 0, awayScore: 0}) {

    const [score, setScore] = useState(initialState);

    const incrementScore = (pointsToAdd, position) => {
        const scoreToChange = position === 'home' ? 'homeScore': 'awayScore';
        const newScore = {...score};
        newScore[scoreToChange] += pointsToAdd;
        setScore(newScore);
        storeBasedOnPlatform('store', 'score', JSON.stringify(newScore));
    };

    const resetScore = () => {
        setScore(initialState);
        storeBasedOnPlatform('store', 'score', JSON.stringify(initialState));
    };

    const manualSetScore = (newScore) => {
        setScore(newScore);
        storeBasedOnPlatform('store', 'score', JSON.stringify(newScore));
    }

    return [score, incrementScore, setScore, resetScore, manualSetScore];
};

function useGameData(initialState={possession: 'home', down: 1}) {

    const [gameData, setGameData] = useState(initialState);

    const changePossession = () => {
        const newData = {...gameData,
                        possession: gameData.possession === 'home' ? 'away' : 'home'};
        setGameData(newData);
        storeBasedOnPlatform('store', 'gameData', JSON.stringify(newData));
    };

    const incrementDown = () => {
        const newData = {...gameData,
                        down: gameData.down < 4 ? gameData.down + 1 : 1};
        setGameData(newData);
        storeBasedOnPlatform('store', 'gameData', JSON.stringify(newData));
    };

    const resetGameData = () => {
        setGameData(initialState);
        storeBasedOnPlatform('store', 'gameData', JSON.stringify(initialState));
    };

    const manualDataChange = (newData) => {
        setGameData(newData);
        storeBasedOnPlatform('store', 'gameData', JSON.stringify(newData));
    };

    return [gameData, changePossession, incrementDown, setGameData, resetGameData, manualDataChange];
};


const initialBaseball = {balls: 0, strikes: 0, outs: 0, inning: 1, top: true, length: 9, gameOver: false};
function useBaseball(initialState=initialBaseball) {

    const [baseballData, setBaseballData] = useState(initialState);

    const newBatter = (data=baseballData) => {
        return {...data, balls: 0, strikes: 0};
    };

    const changeSides = (score) => {
        const newBaseballData = newBatter();
        const gameOver = baseballData.inning >= baseballData.length 
                        && ((!baseballData.top && score.homeScore !== score.awayScore)
                        || (baseballData.top && score.homeScore > score.awayScore));
        if (gameOver) {
            newBaseballData.gameOver = true;
        } else {
            if (!baseballData.top) newBaseballData.inning++;
            newBaseballData.top = !newBaseballData.top;
            newBaseballData.outs = 0;
        };
        return newBaseballData;
    };

    const incrementOuts = (score) => {
        const newBaseballData = baseballData.outs >= 2 ? changeSides(score) 
                                    : {...baseballData, outs: baseballData.outs + 1};
        setBaseballData(newBaseballData);
        storeBasedOnPlatform('store', 'baseballData', JSON.stringify(newBaseballData));
        return newBaseballData;
    };

    const incrementStrikes = (score) => {
        let newBaseballData = {...baseballData};
        if (baseballData.strikes >= 2) {
            newBaseballData = incrementOuts(score);
            newBaseballData = newBatter(newBaseballData);
        } else {
            newBaseballData.strikes++;
        };
        setBaseballData(newBaseballData);
        storeBasedOnPlatform('store', 'baseballData', JSON.stringify(newBaseballData));
    };

    const incrementBalls = () => {
        let newBaseballData = {...baseballData};
        if (baseballData.balls >= 3) {
            newBaseballData = newBatter();
        } else {
            newBaseballData.balls++;
        };
        setBaseballData(newBaseballData);
        storeBasedOnPlatform('store', 'baseballData', JSON.stringify(newBaseballData));
    };

    const resetBaseballData = () => {
        setBaseballData(initialState);
        storeBasedOnPlatform('store', 'baseballData', JSON.stringify(initialState));
    };

    const manualBaseballChange = (newData) => {
        setBaseballData(newData);
        storeBasedOnPlatform('store', 'baseballData', JSON.stringify(newData));
    };

    return [baseballData, incrementBalls, incrementStrikes, incrementOuts, 
            setBaseballData, resetBaseballData, manualBaseballChange];
};


function useErrors() {
    const [apiErrors, setApiErrors] = useState({});

    const getApiErrors = useCallback(e => {
        const errors = {...e};
        setApiErrors(errors);
    }, [setApiErrors]);
    return [apiErrors, getApiErrors, setApiErrors];
};


function useSettings(sport=null) {
    const [defaultValues, setDefaultValues] = useState(sport ? defaultData[sport] : defaultData);

    const getStoredDefaults = async (sport) => {
        const storedValues = await storeBasedOnPlatform('get', 'defaultData');
        let newDefaultValues = sport in defaultValues ? {...defaultValues[sport]}
                                                    : {...defaultValues};
        let parsedValues = {};
        if (storedValues) parsedValues = JSON.parse(storedValues);
        if (parsedValues[sport]) {
            newDefaultValues = {...newDefaultValues, ...parsedValues[sport]};
            setDefaultValues(newDefaultValues);
        };
        return newDefaultValues;
    };

    const updateDefaults = async (newDefaultValues) => {
        setDefaultValues(newDefaultValues);
        await storeBasedOnPlatform('store', 'defaultData', JSON.stringify(newDefaultValues));
    };

    return [getStoredDefaults, defaultValues, setDefaultValues, updateDefaults];
};


export { useTimer, useIncrementScore, useGameData, useBaseball, useErrors, useSettings};