import {useState} from 'react';

function useIncrementScore(initialState={homeScore: 0, awayScore: 0}) {

    const [score, setScore] = useState(initialState);

    const incrementScore = (pointsToAdd, position) => {
        const scoreToChange = position === 'home' ? 'homeScore': 'awayScore';
        const newScore = {...score};
        newScore[scoreToChange] += pointsToAdd;
        setScore(newScore);
    };

    return [score, incrementScore, setScore];
};

export {useIncrementScore};