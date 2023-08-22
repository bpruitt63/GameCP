import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text} from 'react-native';
import { ScoreContext, TimeContext } from './context';
import RunningClock from './RunningClock';

function Timer({defaultValues, sport}) {

    const {time, saveTime, setTime} = useContext(TimeContext);
    const {score} = useContext(ScoreContext);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState({...defaultValues, sport});


    useEffect(() => {
        const getStartingTime = async () => {
			if (time && time.sport === sport) {
                setCurrentTime(time);
            } else {
                setCurrentTime({...defaultValues, sport});
            };
        };
        setIsRunning(false);
        getStartingTime();
    }, [time, setTime, defaultValues]);

    const startTimer = () => {
        if (currentTime.seconds > 0 || currentTime.minutes > 0) {
            setIsRunning(true);
        };
    };

    const stopTimer = (newTime) => {
        setIsRunning(false);
        if (!newTime.regulation && score.homeScore !== score.awayScore) gameOver();
            else saveTime(newTime);
    };

    const nextPeriod = () => {
        const newTime = {...currentTime,
                            minutes: defaultValues.minutes,
                            seconds: defaultValues.seconds,
                            period: currentTime.period + 1};
        saveTime(newTime);
    };

    const gameOver = () => {
        const newTime = {...currentTime,
                            minutes: 0,
                            seconds: 0,
                            gameOver: true};
        setCurrentTime(newTime);
        saveTime(newTime);
    };

    return (
        <View>
            {isRunning ?
                <RunningClock currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            stopTimer={stopTimer}
                            saveTime={saveTime} />
                :
                <Button title={`${currentTime.minutes}:${currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}`}
                        onPress={startTimer} />}
                <Text>{sport === 'soccer' ? 'Period: ' : 'Quarter: '}{currentTime.period}</Text>
                {currentTime.minutes === 0 && currentTime.seconds === 0 && !currentTime.regulation && score.homeScore === score.awayScore && !currentTime.gameOver &&
                    <Button title='End As Tie'
                            onPress={gameOver} />}
                {currentTime.minutes === 0 && currentTime.seconds === 0 && !currentTime.gameOver &&
                    <Button title={!currentTime.regulation && score.homeScore === score.awayScore ? '+ Overtime' : 'Next Period'}
                            onPress={nextPeriod} />}
        </View>
    );
};

export default Timer;