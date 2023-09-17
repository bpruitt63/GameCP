import React, {useState, useEffect, useContext} from 'react';
import { Button, View } from 'react-native';
import { defaultData } from './defaultData';
import { useSettings } from './hooks';
import ManualTimerForm from './ManualTimerForm';
import ManualInputForm from './ManualInputForm';
import { BaseballContext } from './context';

function Settings() {

    const initialOpen = {footballTimer: false, basketballTimer: false, 
                            soccerTimer: false, footballLength: false,
                            soccerLength: false, baseballLength: false,
                            baseballLength: false};
    const [openForm, setOpenForm] = useState(initialOpen);
    const [compiledDefaults, setCompiledDefaults] = useState(defaultData);
    const [getStoredDefaults, defaultValues, setDefaultValues, updateDefaults] = useSettings();
    const {baseballData, manualBaseballChange} = useContext(BaseballContext);

    useEffect(() => {
        const checkStoredDefaults = async () => {
            let newDefaults = {...compiledDefaults};
            const storedFootball = await getStoredDefaults('football');
            const storedBasketball = await getStoredDefaults('basketball');
            const storedSoccer = await getStoredDefaults('soccer');
            const storedBaseball = await getStoredDefaults('baseball');
            if (storedFootball) newDefaults.football = storedFootball;
            if (storedBasketball) newDefaults.basketball = storedBasketball;
            if (storedSoccer) newDefaults.soccer = storedSoccer;
            if (storedBaseball) newDefaults.baseball = storedBaseball;
            setCompiledDefaults(newDefaults);
        };
        checkStoredDefaults();
    }, []);

    const toggleOpen = (form) => setOpenForm({...initialOpen, [form]: true});

    const saveTime = async (newData) => {
        const newDefaultValues = {...compiledDefaults};
        const {sport} = newData;
        newDefaultValues[sport].minutes = +newData.minutes;
        newDefaultValues[sport].seconds = +newData.seconds < 60 ? +newData.seconds : 59;
        await updateDefaults(newDefaultValues);
        setOpenForm(initialOpen);
    };

    const saveLength = async (newData, sport) => {
        const newDefaultValues = {...compiledDefaults};
        if (sport === 'baseball') {
            newDefaultValues.baseball.length = +newData;
            const newBaseballData = {...baseballData};
            newBaseballData.length = +newData;
            manualBaseballChange(newBaseballData);
        } else {
            newDefaultValues[sport].maxPeriod = +newData;
        };
        await updateDefaults(newDefaultValues);
        setOpenForm(initialOpen);
    };

    const saveBaseballLength = (newData) => saveLength(newData, 'baseball');
    const saveBasketballLength = (newData) => saveLength(newData, 'basketball');
    const saveFootballLength = (newData) => saveLength(newData, 'football');
    const saveSoccerLength = (newData) => saveLength(newData, 'soccer');

    const cancel = () => setOpenForm(initialOpen);

    return (
        <View>
            {openForm.basketballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.basketball.minutes,
                                                seconds: compiledDefaults.basketball.seconds > 9 ? compiledDefaults.basketball.seconds : `0${compiledDefaults.basketball.seconds}`,
                                                sport: 'basketball'}}
                                                save={saveTime}
                                                cancel={cancel} />
            :
                <Button title='Default Basketball Quarter Length'
                        onPress={() => toggleOpen('basketballTimer')} />}
            {openForm.basketballLength ?
                <ManualInputForm initialValue={compiledDefaults.basketball.maxPeriod}
                                save={saveBasketballLength}
                                cancel={cancel} />
            :
                <Button title='Default Basketball Periods'
                        onPress={() => toggleOpen('basketballLength')} />}
            {openForm.footballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.football.minutes,
                                                seconds: compiledDefaults.football.seconds > 9 ? compiledDefaults.football.seconds : `0${compiledDefaults.football.seconds}`,
                                                sport: 'football'}}
                                                save={saveTime}
                                                cancel={cancel} />
            :
                <Button title='Default Football Quarter Length'
                        onPress={() => toggleOpen('footballTimer')} />}
            {openForm.footballLength ?
                <ManualInputForm initialValue={compiledDefaults.football.maxPeriod}
                                save={saveFootballLength}
                                cancel={cancel} />
            :
                <Button title='Default Football Periods'
                        onPress={() => toggleOpen('footballLength')} />}
            {openForm.soccerTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.soccer.minutes,
                                                seconds: compiledDefaults.soccer.seconds > 9 ? compiledDefaults.soccer.seconds : `0${compiledDefaults.soccer.seconds}`,
                                                sport: 'soccer'}}
                                                save={saveTime}
                                                cancel={cancel} />
            :
                <Button title='Default Soccer Period Length'
                        onPress={() => toggleOpen('soccerTimer')} />}
            {openForm.soccerLength ?
                <ManualInputForm initialValue={compiledDefaults.soccer.maxPeriod}
                                save={saveSoccerLength}
                                cancel={cancel} />
            :
                <Button title='Default Soccer Periods'
                        onPress={() => toggleOpen('soccerLength')} />}
            {openForm.baseballLength ?
                <ManualInputForm initialValue={compiledDefaults.baseball.length}
                                    save={saveBaseballLength}
                                    cancel={cancel} />
            :
                <Button title='Default Innings'
                        onPress={() => toggleOpen('baseballLength')} />}
        </View>
    );
};

export default Settings;