import React, {useEffect} from 'react';
import { Button } from 'react-native';
import { storeBasedOnPlatform } from './helpers';

function RunningClock({currentTime, setCurrentTime, stopTimer}) {

    useEffect(() => {
        const getTime = () => {
            const newTime = {...currentTime};
            if (newTime.seconds > 0) {
                newTime.seconds--;
            } else if (newTime.minutes > 0) {
                newTime.minutes--;
                newTime.seconds = 59;
            } else {
                newTime.minutes = 0;
                newTime.seconds = 0;
            };
            setCurrentTime(newTime);
            storeBasedOnPlatform('store', 'time', JSON.stringify(newTime));
        };
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [currentTime]);

    return (
        <Button title={`${currentTime.minutes}:${currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}`}
                onPress={stopTimer} />
    );
};

export default RunningClock;