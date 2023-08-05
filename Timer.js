import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import { storeBasedOnPlatform } from './helpers';
import RunningClock from './RunningClock';

function Timer({defaultValues}) {

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(defaultValues);

    useEffect(() => {
        const getStoredTime = async () => {
            const storedTime = await storeBasedOnPlatform('get', 'time');
			if (storedTime && storedTime.sport === defaultValues.sport) {
                setTime(JSON.parse(storedTime));
            } else {
                setTime(defaultValues);
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