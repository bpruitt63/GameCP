import React, {useState, useEffect, useContext} from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { defaultData } from './defaultData';
import { useSettings } from './hooks';
import ManualTimerForm from './ManualTimerForm';
import ManualInputForm from './ManualInputForm';
import { appStyles } from './styles/appStyles';
import { menuStyles } from './styles/menuStyles';
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

    const viewStyles = StyleSheet.compose(appStyles.app, menuStyles.menuSection);

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
        <View style={viewStyles}>
            {openForm.basketballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.basketball.minutes.toString(),
                                                seconds: compiledDefaults.basketball.seconds > 9 ? compiledDefaults.basketball.seconds.toString() : `0${compiledDefaults.basketball.seconds}`,
                                                sport: 'basketball'}}
                                                save={saveTime}
                                                cancel={cancel}
                                                textStyle={appStyles.text}
                                                formStyle={menuStyles.timerSettings} />
            :
                <TouchableOpacity style={menuStyles.menuButton}
                                onPress={() => toggleOpen('basketballTimer')}>
                    <Text style={appStyles.text}>Default Basketball Quarter Length</Text>
                </TouchableOpacity>}
            {openForm.basketballLength ?
                <ManualInputForm initialValue={compiledDefaults.basketball.maxPeriod.toString()}
                                save={saveBasketballLength}
                                cancel={cancel}
                                textStyle={appStyles.text}
                                formStyle={menuStyles.periodSettings} />
            :
                <TouchableOpacity style={menuStyles.menuButton}
                                onPress={() => toggleOpen('basketballLength')}>
                    <Text style={appStyles.text}>Default Basketball Periods</Text>
                </TouchableOpacity>}
            {openForm.footballTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.football.minutes.toString(),
                                                seconds: compiledDefaults.football.seconds > 9 ? compiledDefaults.football.seconds.toString() : `0${compiledDefaults.football.seconds}`,
                                                sport: 'football'}}
                                                save={saveTime}
                                                cancel={cancel}
                                                textStyle={appStyles.text}
                                                formStyle={menuStyles.timerSettings} />
            :
                <TouchableOpacity style={menuStyles.menuButton}
                                onPress={() => toggleOpen('footballTimer')}>
                    <Text style={appStyles.text}>Default Football Quarter Length</Text>
                </TouchableOpacity>}
            {openForm.footballLength ?
                <ManualInputForm initialValue={compiledDefaults.football.maxPeriod.toString()}
                                save={saveFootballLength}
                                cancel={cancel}
                                textStyle={appStyles.text}
                                formStyle={menuStyles.periodSettings} />
            :
                <TouchableOpacity style={menuStyles.menuButton}
                                onPress={() => toggleOpen('footballLength')}>
                    <Text style={appStyles.text}>Default Football Periods</Text>
                </TouchableOpacity>}
            {openForm.soccerTimer ?
                <ManualTimerForm initialValue={{minutes: compiledDefaults.soccer.minutes.toString(),
                                                seconds: compiledDefaults.soccer.seconds > 9 ? compiledDefaults.soccer.seconds.toString() : `0${compiledDefaults.soccer.seconds}`,
                                                sport: 'soccer'}}
                                                save={saveTime}
                                                cancel={cancel}
                                                textStyle={appStyles.text}
                                                formStyle={menuStyles.timerSettings} />
            :
                <TouchableOpacity style={menuStyles.menuButton}
                                onPress={() => toggleOpen('soccerTimer')}>
                    <Text style={appStyles.text}>Default Soccer Period Length</Text>
                </TouchableOpacity>}
            {openForm.soccerLength ?
                <ManualInputForm initialValue={compiledDefaults.soccer.maxPeriod.toString()}
                                save={saveSoccerLength}
                                cancel={cancel}
                                textStyle={appStyles.text}
                                formStyle={menuStyles.periodSettings} />
            :
                <TouchableOpacity style={menuStyles.menuButton}
                                onPress={() => toggleOpen('soccerLength')}>
                    <Text style={appStyles.text}>Default Soccer Periods</Text>
                </TouchableOpacity>}
            {openForm.baseballLength ?
                <ManualInputForm initialValue={compiledDefaults.baseball.length.toString()}
                                    save={saveBaseballLength}
                                    cancel={cancel}
                                    textStyle={appStyles.text}
                                    formStyle={menuStyles.periodSettings} />
            :
                <TouchableOpacity style={menuStyles.menuButton}
                                onPress={() => toggleOpen('baseballLength')}>
                    <Text style={appStyles.text}>Default Innings</Text>
                </TouchableOpacity>}
        </View>
    );
};

export default Settings;