import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import { timerStyles } from './styles/timerStyles';
import { ScoreContext, TimeContext } from './context';
import RunningClock from './RunningClock';
import ManualTimerForm from './ManualTimerForm';
import ManualInputForm from './ManualInputForm';

function Timer({defaultValues, sport, textStyle}) {

    const {time, saveTime, setTime} = useContext(TimeContext);
    const {score} = useContext(ScoreContext);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState({...defaultValues, sport});
    const intitialFormOpen = {timer: false, period: false};
    const [formOpen, setFormOpen] = useState(intitialFormOpen);
    const clockStyle = [textStyle, {fontSize: '6em'}];


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
        setFormOpen(intitialFormOpen);
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

    const openForm = (field) => {
        setFormOpen({...intitialFormOpen, [field]: true});
    };

    const timerSave = (newTime) => {
        const newCurrentTime = {...currentTime, 
                                minutes: +newTime.minutes,
                                seconds: +newTime.seconds};
        if (newCurrentTime.seconds > 59) newCurrentTime.seconds = 59;
        setCurrentTime(newCurrentTime);
        saveTime(newCurrentTime);
        setFormOpen(intitialFormOpen);
    };

    const periodSave = (newPeriod) => {
        const newCurrentTime = {...currentTime, period: newPeriod};
        setCurrentTime(newCurrentTime);
        saveTime(newCurrentTime);
        setFormOpen(intitialFormOpen);
    };

    const cancel = () => setFormOpen(intitialFormOpen);

    return (
        <View style={timerStyles.container}>
            <View style={timerStyles.clock}>
                {isRunning && !formOpen.timer &&
                    <RunningClock currentTime={currentTime}
                                setCurrentTime={setCurrentTime}
                                stopTimer={stopTimer}
                                saveTime={saveTime}
                                styles={{clockStyle, display: timerStyles.clockDisplay}} />}
                {!isRunning && !formOpen.timer &&
                    <TouchableOpacity onPress={startTimer}
                                    onLongPress={() => openForm('timer')}
                                    style={timerStyles.clockDisplay} >
                        <Text style={clockStyle}>{`${currentTime.minutes}:${currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}`}</Text>
                    </TouchableOpacity>}
                {!isRunning && formOpen.timer &&
                    <ManualTimerForm initialValue={{minutes: currentTime.minutes > 9 ? currentTime.minutes : `0${currentTime.minutes}`, seconds: currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}}
                                    save={timerSave}
                                    cancel={cancel} />}
            </View>
            <View style={timerStyles.period}>
                {formOpen.period ?
                    <>
                        <Text style={textStyle}>{currentTime.maxPeriod === 4 ? 'Quarter ' : 'Period' }</Text>
                        <ManualInputForm initialValue={currentTime.period}
                                        save={periodSave}
                                        cancel={cancel} />
                    </>
                    :
                    <TouchableOpacity onLongPress={() => openForm('period')}>
                        <Text style={textStyle}>
                            {currentTime.maxPeriod === 4 ? 'Quarter ' : 'Period '}
                            {currentTime.period <= currentTime.maxPeriod ? currentTime.period 
                                            : `OT${currentTime.period - currentTime.maxPeriod}`}
                        </Text>
                    </TouchableOpacity>}
            </View>
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