import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { timerStyles } from '../styles/timerStyles';
import { ScoreContext, TimeContext } from '../context';
import RunningClock from './RunningClock';
import ManualTimerForm from '../Forms/ManualTimerForm';
import ManualInputForm from '../Forms/ManualInputForm';

function Timer({defaultValues, sport, textStyle, isRunning, setIsRunning, resetNavigate}) {

    const {time, saveTime, setTime} = useContext(TimeContext);
    const {score} = useContext(ScoreContext);
    //const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState({...defaultValues, sport});
    const intitialFormOpen = {timer: false, period: false};
    const [formOpen, setFormOpen] = useState(intitialFormOpen);
    
    const clockStyle = [textStyle, {fontSize: currentTime.minutes === 0 && currentTime.seconds === 0 && !currentTime.gameOver ? 60 : 80}];


    useEffect(() => {
        const getStartingTime = () => {
			if (time && time.sport === sport) {
                const newTime = checkGameStatus({...time}, score)
                setCurrentTime(newTime);
                saveTime(newTime);
            } else {
                setCurrentTime({...defaultValues, sport});
            };
        };
        setIsRunning(false);
        getStartingTime();
        setFormOpen(intitialFormOpen);
    }, [setTime, defaultValues]);

    const period = time?.period;
    const regulation = currentTime?.regulation;
    useEffect(() => {
        const checkStatusOnDataChange = () => {
            const newTime = checkGameStatus({...currentTime}, score)
            setCurrentTime(newTime);
            saveTime(newTime);
        };
        checkStatusOnDataChange();
    }, [score, period, regulation]);

    useEffect(() => {
        const saveOnNavigate = (timeToSave) => {
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                saveTime(timeToSave);
                navigation.dispatch(e.data.action);
            });
        };
        if (resetNavigate) saveOnNavigate(resetNavigate);
    }, [resetNavigate]);

    const checkGameStatus = (timeToCheck, scoreToCheck) => {
        if (timeToCheck.minutes === 0 && timeToCheck.seconds === 0 && timeToCheck.maxPeriod <= timeToCheck.period) {
            timeToCheck.regulation = false;
            if (scoreToCheck.homeScore !== scoreToCheck.awayScore) {
                timeToCheck.gameOver = true;
            } else {
                timeToCheck.gameOver = false;
            };
        } else {
            timeToCheck.gameOver = false;
            timeToCheck.regulation = true;
        };
        return timeToCheck;
    };

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
        setCurrentTime(newTime);
        saveTime(newTime);
    };

    const gameOver = () => {
        const newTime = {...currentTime};
        newTime.minutes = 0;
        newTime.seconds = 0;
        newTime.gameOver = true;
        newTime.regulation = false;
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
        if (newCurrentTime.minutes || newCurrentTime.seconds) newCurrentTime.gameOver = false;
        if (newCurrentTime.period < newCurrentTime.maxPeriod
            || (newCurrentTime.period === newCurrentTime.maxPeriod && (newCurrentTime.minutes || newCurrentTime.seconds))) {
                newCurrentTime.regulation = true;
            };
        setCurrentTime(newCurrentTime);
        saveTime(newCurrentTime);
        setFormOpen(intitialFormOpen);
    };

    const periodSave = (newPeriod) => {
        const newCurrentTime = {...currentTime, period: +newPeriod};
        setCurrentTime(newCurrentTime);
        saveTime(newCurrentTime);
        setFormOpen(intitialFormOpen);
    };

    const cancel = () => setFormOpen(intitialFormOpen);

    return (
        <View style={timerStyles.container}>{console.log(currentTime)}
            <View style={[timerStyles.period, formOpen.period ? timerStyles.periodFormOpen : '']}>
                {formOpen.period ?
                    <>
                        <Text style={textStyle}>{currentTime.maxPeriod === 4 ? 'Quarter:' : 'Period' }</Text>
                        <ManualInputForm initialValue={currentTime.period.toString()}
                                        save={periodSave}
                                        cancel={cancel}
                                        textStyle={textStyle}
                                        formStyle={timerStyles.manualQuarterInput} />
                    </>
                    :
                    <TouchableOpacity style={timerStyles.periodButton}
                                        onLongPress={() => openForm('period')}>
                        <Text style={textStyle}>
                            {currentTime.maxPeriod === 4 ? 'Quarter ' : 'Period '}
                            {currentTime.period <= currentTime.maxPeriod ? currentTime.period 
                                            : `OT${currentTime.period - currentTime.maxPeriod}`}
                        </Text>
                    </TouchableOpacity>}
            </View>
            <View style={[timerStyles.clock, 
                        currentTime.minutes === 0 && currentTime.seconds === 0 && !currentTime.gameOver ? {height: '60%'} : '']}>
                {isRunning && !formOpen.timer &&
                    <RunningClock currentTime={currentTime}
                                setCurrentTime={setCurrentTime}
                                stopTimer={stopTimer}
                                saveTime={saveTime}
                                resetNavigate={resetNavigate}
                                styles={{clockStyle, display: timerStyles.clockDisplay}} />}
                {!isRunning && !formOpen.timer &&
                    <TouchableOpacity onPress={startTimer}
                                    onLongPress={() => openForm('timer')}
                                    style={timerStyles.clockDisplay} >
                        <Text style={clockStyle}>{`${currentTime.minutes}:${currentTime.seconds > 9 ? currentTime.seconds : `0${currentTime.seconds}`}`}</Text>
                    </TouchableOpacity>}
                {!isRunning && formOpen.timer &&
                    <ManualTimerForm initialValue={{minutes: currentTime.minutes > 9 ? currentTime.minutes.toString() : `0${currentTime.minutes}`,
                                                    seconds: currentTime.seconds > 9 ? currentTime.seconds.toString() : `0${currentTime.seconds}`}}
                                    save={timerSave}
                                    cancel={cancel}
                                    formStyle={timerStyles.manualTimerInput}
                                    textStyle={textStyle}
                                    colonStyle={[textStyle, {fontSize: 40}]} />}
            </View>
            {currentTime.minutes === 0 && currentTime.seconds === 0 && !currentTime.gameOver &&
                <View style={timerStyles.periodOverButtonsContainer}>
                    {!currentTime.regulation && score.homeScore === score.awayScore &&
                        <TouchableOpacity onPress={gameOver}
                                            style={timerStyles.periodOverButton}>
                            <Text style={textStyle}>End As Tie</Text>
                        </TouchableOpacity>}
                    <TouchableOpacity onPress={nextPeriod}
                                        style={timerStyles.periodOverButton}>
                        <Text style={textStyle}>{!currentTime.regulation && score.homeScore === score.awayScore ? '+ Overtime' : 'Next Period'}</Text>    
                    </TouchableOpacity>
                </View>}
        </View>
    );
};

export default Timer;