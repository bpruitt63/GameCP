import React, {useState, useEffect, useContext} from 'react';
import {View, Button} from 'react-native';
import { TimeContext } from './context';
import RunningClock from './RunningClock';

function Timer({defaultValues}) {

    const {time, saveTime, setTime} = useContext(TimeContext);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(defaultValues);

    useEffect(() => {
        const getStartingTime = async () => {
			if (time && time.sport === defaultValues.sport) {
                setCurrentTime(time);
            } else {
                setCurrentTime(defaultValues);
            };
        };
        setIsRunning(false);
        getStartingTime();
    }, [time, setTime, defaultValues]);

    const stopTimer = () => {
        setIsRunning(false);
        saveTime(currentTime);
    };

    return (
        <View>
            {isRunning ?
                <RunningClock currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            stopTimer={stopTimer} />
                :
                <Button title={`${currentTime.minutes}:${currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}`}
                        onPress={() => setIsRunning(true)} />}
        </View>
    );
};

export default Timer;