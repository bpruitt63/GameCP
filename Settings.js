import React, {useState, useEffect} from 'react';
import { Button, View } from 'react-native';
import { defaultData } from './defaultData';
import { useSettings } from './hooks';
import ManualTimerForm from './ManualTimerForm';

function Settings() {

    const initialOpen = {footballTimer: false, basketballTimer: false, soccerTimer: false};
    const [openForm, setOpenForm] = useState(initialOpen);
    const [compiledDefaults, setCompiledDefaults] = useState(defaultData);
    const [defaultValues, getStoredDefaults] = useSettings();

    useEffect(() => {
        let newDefaults = {...compiledDefaults};
        const storedFootball = getStoredDefaults('football');
        const storedBasketball = getStoredDefaults('basketball');
        const storedSoccer = getStoredDefaults('soccer');
        if (storedFootball) newDefaults = {...newDefaults, ...storedFootball};
        if (storedBasketball) newDefaults = {...newDefaults, ...storedBasketball};
        if (storedSoccer) newDefaults = {...newDefaults, ...storedSoccer};
        setCompiledDefaults(newDefaults);
    }, []);

    const toggleOpen = (form) => setOpenForm({...initialOpen, [form]: true});

    const cancel = () => setOpenForm(initialOpen);

    return (
        <View>
            {openForm.footballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.football.minutes,
                                                seconds: compiledDefaults.football.seconds}}
                                                save={cancel}
                                                cancel={cancel} />
            :
                <Button title='Default Football Time'
                        onPress={() => toggleOpen('footballTimer')} />}
        </View>
    );
};

export default Settings;