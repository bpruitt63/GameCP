import {useState, useCallback} from 'react';
import { storeBasedOnPlatform } from './helpers';

function useIncrementScore(initialState={homeScore: 0, awayScore: 0}) {

    const [score, setScore] = useState(initialState);

    const incrementScore = (pointsToAdd, position) => {
        const scoreToChange = position === 'home' ? 'homeScore': 'awayScore';
        const newScore = {...score};
        newScore[scoreToChange] += pointsToAdd;
        setScore(newScore);
        storeBasedOnPlatform('store', 'score', JSON.stringify(newScore));
    };

    return [score, incrementScore, setScore];
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
        setGameData({...gameData, newDown});
        storeBasedOnPlatform('store', 'gameData', JSON.stringify(newData));
    };

    return [gameData, changePossession, incrementDown, setGameData];
};


function useErrors() {
    const [apiErrors, setApiErrors] = useState({});

    const getApiErrors = useCallback(e => {
        const errors = {...e};
        setApiErrors(errors);
    }, [setApiErrors]);
    return [apiErrors, getApiErrors, setApiErrors];
};


export {useIncrementScore, useGameData, useErrors};