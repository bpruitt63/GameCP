import React, {useState, useContext, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import { GameContext, UserContext } from './context';
import {useErrors} from './hooks';
import SelectList from './SelectList';
import Errors from './Errors';
import API from './Api';

function Select() {

    const [step, setStep] = useState(1);
    const [seasons, setSeasons] = useState([]);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const user = useContext(UserContext);
    const {organization, setOrganization, season, setSeason, 
            game, setGame, storeBasedOnPlatform} = useContext(GameContext);
    const userOrgs = Object.keys(user.organizations).map(k => [k, user.organizations[k].orgName]);

    useEffect(() => {
        const getCurrentStep = () => {
            if (game) {
                setStep(4);
            } else if (season) {
                setStep(3);
            } else if (organization) {
                setStep(2);
            };
        };
        getCurrentStep();
    }, [setStep]);

    // TODO finish this function!
    const goToStep = async (step) => {
        switch (step) {
            case 2:
                await getSeasons(organization.orgId);
                break;
        };
        setStep(step);
    };

    const selectOrg = async (id) => {
        setApiErrors({});
        const currentOrg = {...user.organizations[id], orgId: id};
        setOrganization(currentOrg);
        const orgString = JSON.stringify(currentOrg);
        storeBasedOnPlatform('store', 'organization', orgString);
        const seasonsRes = await getSeasons(id);
        if (seasonsRes) setStep(2);
    };

    const getSeasons = async (orgId) => {
        try {
            const seasons = await API.getSeasons(orgId);
            setSeasons(seasons.map(s => [s.seasonId, s.title]));
            return seasons;
        } catch (err) {
            getApiErrors(err);
        };
    };

    const selectSeason = async (id) => {
        setApiErrors({});
        const res = seasons.filter(s => s[0] === id)[0];
        const currentSeason = {seasonId: res[0], title: res[1]};
        setSeason(currentSeason);
        const seasonString = JSON.stringify(currentSeason);
        storeBasedOnPlatform('store', 'season', seasonString);
        //const seasonsRes = await getSeasons(id);
        //setSeasons(seasonsRes.map(s => [s.seasonId, s.title]));
        setStep(3);
    };

    return (
        <View>
            <Errors apiErrors={apiErrors} />
            <Text>{step}</Text>
            {step === 1 &&
                <SelectList data={userOrgs}
                            press={selectOrg} />}
            {step === 2 &&
                <SelectList data={seasons}
                            press={selectSeason} />}
            {step > 1 &&
                <Button title='Change Organization'
                        onPress={() => setStep(1)} />}
            {step > 2 &&
                <Button title='Change Season'
                        onPress={() => goToStep(2)} />}
            {step > 3 &&
                <Button title='Change Game'
                        onPress={() => setStep(3)} />}
        </View>
    );
};

export default Select;