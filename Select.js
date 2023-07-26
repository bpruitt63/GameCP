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
    const [games, setGames] = useState([]);
    const [tournamentRounds, setTournamentRounds] = useState([]);
    const [tournamentGames, setTournamentGames] = useState({});
    const [errors, setErrors] = useState({});
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
            case 3:
                await getGames(organization.orgId, season.seasonId);
                break;
        };
        setStep(step);
    };

    const getSeasons = async (orgId) => {
        try {
            const seasonsRes = await API.getSeasons(orgId);
            if (!seasonsRes[0]) setErrors({err: 'No seasons found'});
            setSeasons(seasonsRes.map(s => [s.seasonId, s.title]));
            return seasonsRes;
        } catch (err) {
            getApiErrors(err);
        };
    };

    const getGames = async (orgId, seasonId) => {
        setTournamentRounds([]);
        try {
            const gamesRes = await API.getGames(orgId, seasonId);
            if (Array.isArray(gamesRes)) {
                setGames(formatGames(gamesRes));
            } else {
                setTournamentRounds(Object.keys(gamesRes));
                setTournamentGames(gamesRes);
                setGames(formatGames(Object.values(gamesRes['Round 1'])));
            };
            return gamesRes;
        } catch (err) {
            getApiErrors(err);
        };
    };

    const formatGames = (games) => {
        const formattedGames = games.filter(g => g.team1Score === null);
        if (!formattedGames[0]) setErrors({err: 'No games yet to be played this season'});
        for (let i = 0; i < formattedGames.length; i++) {
            let title = `${formattedGames[i].team1Name || 'TBD'} vs ${formattedGames[i].team2Name || 'TBD'}`;
            if (formattedGames[i].readableTime) title += ` at ${formattedGames[i].readableTime}`;
            if (formattedGames[i].readableDate) title += ` on ${formattedGames[i].readableDate}`;
            formattedGames[i] = [formattedGames[i].gameId, title, formattedGames[i].team1Color, formattedGames[i].team2Color];
        };
        return formattedGames;
    };

    const selectOrg = async (id) => {
        setApiErrors({});
        setErrors({});
        const currentOrg = {...user.organizations[id], orgId: id};
        setOrganization(currentOrg);
        const orgString = JSON.stringify(currentOrg);
        storeBasedOnPlatform('store', 'organization', orgString);
        const seasonsRes = await getSeasons(id);
        if (seasonsRes) setStep(2);
    };

    const selectSeason = async (id) => {
        setApiErrors({});
        setErrors({});
        const res = seasons.filter(s => s[0] === id)[0];
        const currentSeason = {seasonId: res[0], title: res[1]};
        setSeason(currentSeason);
        const seasonString = JSON.stringify(currentSeason);
        storeBasedOnPlatform('store', 'season', seasonString);
        const gamesRes = await getGames(organization.orgId, currentSeason.seasonId);
        if (gamesRes) setStep(3);
    };

    const selectGame = (id) => {
        setApiErrors({});
        setErrors({});
        const selectedGame = games.find(g => g[0] === id);
        setGame(selectedGame);
        const gameString = JSON.stringify(selectedGame);
        storeBasedOnPlatform('store', 'game', gameString);
    };

    const setRound = (key) => {
        setGames(formatGames(Object.values(tournamentGames[key])));
    };

    return (
        <View>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            <Text>{step}</Text>
            {step === 1 &&
                <SelectList data={userOrgs}
                            press={selectOrg} />}
            {step === 2 &&
                <SelectList data={seasons}
                            press={selectSeason} />}
            {step === 3 &&
                <>
                    {tournamentRounds.map(r =>
                        <Button key={r}
                                title={r}
                                onPress={() => setRound(r)} />)}
                    <SelectList data={games}
                                press={selectGame} />
                </>}
            {step > 1 &&
                <Button title='Change Organization'
                        onPress={() => setStep(1)} />}
            {step > 2 &&
                <Button title='Change Season'
                        onPress={() => goToStep(2)} />}
            {step > 3 &&
                <Button title='Change Game'
                        onPress={() => goToStep(3)} />}
        </View>
    );
};

export default Select;