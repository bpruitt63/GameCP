import React, {useEffect} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RunningClock({currentTime, setCurrentTime, stopTimer, saveTime, resetNavigate, styles}) {

    const navigation = useNavigation();

    useEffect(() => {
        const getTime = () => {
            const newTime = {...currentTime};
            if (newTime.seconds > 1 || (newTime.minutes >= 1 && newTime.seconds === 1) ) {
                newTime.seconds--;
            } else if (newTime.minutes > 0) {
                newTime.minutes--;
                newTime.seconds = 59;
            } else {
                newTime.minutes = 0;
                newTime.seconds = 0;
                if (newTime.period >= newTime.maxPeriod) newTime.regulation = false;
                else newTime.regulation = true;
                stopTimer(newTime);
            };
            setCurrentTime(newTime);
            return newTime;
        };
        const saveOnNavigate = (timeToSave) => {
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                saveTime(timeToSave);
                navigation.dispatch(e.data.action);
            });
        };
        const setUpTime = () => {
            return saveOnNavigate(resetNavigate ? resetNavigate : getTime());
        };
        const interval = setInterval(() => setUpTime(), 1000);
        return () => clearInterval(interval);
    }, [navigation, currentTime, stopTimer, saveTime]);


    return (
        <TouchableOpacity onPress={() => stopTimer(currentTime)} 
                            style={styles.display}>
            <Text style={styles.clockStyle}>
                {`${currentTime.minutes}:${currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}`}
            </Text>
        </TouchableOpacity>
    );
};

export default RunningClock;