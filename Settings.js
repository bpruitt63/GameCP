import React, {useState, useEffect} from 'react';
import { Button, View } from 'react-native';
import { defaultData } from './defaultData';
import { useSettings } from './hooks';
import ManualTimerForm from './ManualTimerForm';
import ManualInputForm from './ManualInputForm';

function Settings() {

    const initialOpen = {footballTimer: false, basketballTimer: false, 
                            soccerTimer: false, baseballLength: false};
    const [openForm, setOpenForm] = useState(initialOpen);
    const [compiledDefaults, setCompiledDefaults] = useState(defaultData);
    const [getStoredDefaults, defaultValues, setDefaultValues, updateDefaults] = useSettings();

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

    const save = async (newData) => {
        const newDefaultValues = {...compiledDefaults};
        const {sport} = newData;
        if (sport) {
            newDefaultValues[sport].minutes = +newData.minutes;
            newDefaultValues[sport].seconds = +newData.seconds < 60 ? +newData.seconds : 59;
        } else {
            newDefaultValues.baseball.length = +newData;
        };
        await updateDefaults(newDefaultValues);
        setOpenForm(initialOpen);
    };

    const cancel = () => setOpenForm(initialOpen);

    return (
        <View>
            {openForm.basketballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.basketball.minutes,
                                                seconds: compiledDefaults.basketball.seconds > 9 ? compiledDefaults.basketball.seconds : `0${compiledDefaults.basketball.seconds}`,
                                                sport: 'basketball'}}
                                                save={save}
                                                cancel={cancel} />
            :
                <Button title='Default Basketball Quarter Length'
                        onPress={() => toggleOpen('basketballTimer')} />}
            {openForm.footballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.football.minutes,
                                                seconds: compiledDefaults.football.seconds > 9 ? compiledDefaults.football.seconds : `0${compiledDefaults.football.seconds}`,
                                                sport: 'football'}}
                                                save={save}
                                                cancel={cancel} />
            :
                <Button title='Default Football Quarter Length'
                        onPress={() => toggleOpen('footballTimer')} />}
            {openForm.soccerTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.soccer.minutes,
                                                seconds: compiledDefaults.soccer.seconds > 9 ? compiledDefaults.soccer.seconds : `0${compiledDefaults.soccer.seconds}`,
                                                sport: 'soccer'}}
                                                save={save}
                                                cancel={cancel} />
            :
                <Button title='Default Soccer Period Length'
                        onPress={() => toggleOpen('soccerTimer')} />}
            {openForm.baseballLength ?
                <ManualInputForm initialValue={compiledDefaults.baseball.length}
                                    save={save}
                                    cancel={cancel} />
            :
                <Button title='Default Innings'
                        onPress={() => toggleOpen('baseballLength')} />}
        </View>
    );
};

export default Settings;