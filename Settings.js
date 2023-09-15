import React, {useState, useEffect} from 'react';
import { Button, View } from 'react-native';
import { defaultData } from './defaultData';
import { useSettings } from './hooks';
import ManualTimerForm from './ManualTimerForm';

function Settings() {

    const initialOpen = {footballTimer: false, basketballTimer: false, soccerTimer: false};
    const [openForm, setOpenForm] = useState(initialOpen);
    const [compiledDefaults, setCompiledDefaults] = useState(defaultData);
    const [getStoredDefaults, defaultValues, setDefaultValues, updateDefaults] = useSettings();

    useEffect(() => {
        const checkStoredDefaults = async () => {
            let newDefaults = {...compiledDefaults};
            const storedFootball = await getStoredDefaults('football');
            const storedBasketball = await getStoredDefaults('basketball');
            const storedSoccer = await getStoredDefaults('soccer');
            if (storedFootball) newDefaults.football = storedFootball;
            if (storedBasketball) newDefaults.basketball = storedBasketball;
            if (storedSoccer) newDefaults.soccer = storedSoccer;
            setCompiledDefaults(newDefaults);
        };
        checkStoredDefaults();
    }, []);

    const toggleOpen = (form) => setOpenForm({...initialOpen, [form]: true});

    const save = async (newData) => {
        const newDefaultValues = {...compiledDefaults};
        const {sport} = newData;
        newDefaultValues[sport].minutes = +newData.minutes;
        newDefaultValues[sport].seconds = +newData.seconds < 60 ? newData.seconds : 59;
        await updateDefaults(newDefaultValues);
        setOpenForm(initialOpen);
    };

    const cancel = () => setOpenForm(initialOpen);

    return (
        <View>
            {openForm.footballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.football.minutes,
                                                seconds: compiledDefaults.football.seconds > 9 ? compiledDefaults.football.seconds : `0${compiledDefaults.football.seconds}`,
                                                sport: 'football'}}
                                                save={save}
                                                cancel={cancel} />
            :
                <Button title='Default Football Time'
                        onPress={() => toggleOpen('footballTimer')} />}
        </View>
    );
};

export default Settings;