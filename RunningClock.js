import React, {useEffect} from 'react';
import { Button } from 'react-native';
import { storeBasedOnPlatform } from './helpers';

function RunningClock({time, setTime, setIsRunning}) {

    useEffect(() => {
        const getTime = () => {
            const newTime = {...time};
            if (newTime.seconds > 0) {
                newTime.seconds--;
            } else if (time.minutes > 0) {
                newTime.minutes--;
                newTime.seconds = 59;
            } else {
                newTime.minutes = 0;
                newTime.seconds = 0;
            };
            setTime(newTime);
            storeBasedOnPlatform('store', 'time', JSON.stringify(newTime));
        };
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <Button title={`${time.minutes}:${time.seconds > 9 ? time.seconds : `0${time.seconds}`}`}
                onPress={() => setIsRunning(false)} />
    );
};

export default RunningClock;