import React, {useEffect} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RunningClock({currentTime, setCurrentTime, stopTimer, saveTime}) {

    const navigation = useNavigation();

    useEffect(() => {
        const getTime = () => {
            const newTime = {...currentTime};
            if (newTime.seconds > 1) {
                newTime.seconds--;
            } else if (newTime.minutes > 0) {
                newTime.minutes--;
                newTime.seconds = 59;
            } else {
                newTime.minutes = 0;
                newTime.seconds = 0;
                if (newTime.period >= newTime.maxPeriod) newTime.regulation = false;
                stopTimer(newTime);
            };
            setCurrentTime(newTime);
        };
        const saveOnNavigate = () => {
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                saveTime(currentTime);
                navigation.dispatch(e.data.action);
            });
        };
        saveOnNavigate();
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [currentTime, stopTimer, saveTime]);

    return (
        <TouchableOpacity onPress={() => stopTimer(currentTime)} >
            <Text>
                {`${currentTime.minutes}:${currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}`}
            </Text>
        </TouchableOpacity>
    );
};

export default RunningClock;