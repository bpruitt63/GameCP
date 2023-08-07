import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import { storeBasedOnPlatform } from './helpers';
import RunningClock from './RunningClock';

function Timer({defaultValues, sport}) {

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(defaultValues);

    useEffect(() => {
        const getStoredTime = async () => {
            let storedTime = await storeBasedOnPlatform('get', 'time');
            storedTime = JSON.parse(storedTime);
			if (storedTime && storedTime.sport === sport) {
                setTime(storedTime);
            } else {
                setTime({...defaultValues, sport});
            };
        };
        setIsRunning(false);
        getStoredTime();
    }, [setTime, defaultValues]);

    return (
        <View>
            {isRunning ?
                <RunningClock time={time}
                            setTime={setTime}
                            setIsRunning={setIsRunning} />
                :
                <Button title={`${time.minutes}:${time.seconds > 9 ? time.seconds : `0${time.seconds}`}`}
                        onPress={() => setIsRunning(true)} />}
        </View>
    );
};

export default Timer;