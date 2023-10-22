import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { GameContext, UserContext } from './context';
import {useErrors} from './hooks';
import { storeBasedOnPlatform } from './helpers';
import { appStyles } from './styles/appStyles';
import { menuStyles } from './styles/menuStyles';
import SelectList from './SelectList';
import Errors from './Errors';
import API from './Api';

function Select({navigation}) {

    const [step, setStep] = useState(0);
    const [seasons, setSeasons] = useState([]);
    const [games, setGames] = useState([]);
    const [tournamentRounds, setTournamentRounds] = useState([]);
    const [tournamentGames, setTournamentGames] = useState({});
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const user = useContext(UserContext);
    const {organization, setOrganization, season, 
            setSeason, game, setGame} = useContext(GameContext);
    const userOrgs = Object.keys(user.organizations).map(k => [k, user.organizations[k].orgName]);

    useEffect(() => {
        const getCurrentStep = () => {
            if (game) {
                goToStep(3);
            } else if (season) {
                goToStep(2);
            } else if (organization) {
                goToStep(1);
            };
        };
        getCurrentStep();
    }, [goToStep]);


    const goToStep = async (step) => {
        setErrors({});
        setApiErrors({});
        switch (step) {
            case 1:
                break;
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
            formattedGames[i] = [formattedGames[i].gameId, title, 
                                formattedGames[i].team1Color, formattedGames[i].team2Color,
                                formattedGames[i].team1Id, formattedGames[i].team2Id,
                                formattedGames[i].team1Name, formattedGames[i].team2Name];
        };
        return formattedGames;
    };

    const removeGame = () => {
        if (game) {
            setGame(null);
            storeBasedOnPlatform('remove', 'game');
        };
    };

    const removeSeason = () => {
        if (season) {
            setSeason(null);
            storeBasedOnPlatform('remove', 'season');
        };
    };

    const selectOrg = async (id) => {
        setApiErrors({});
        setErrors({});
        const currentOrg = {...user.organizations[id], orgId: id};
        setOrganization(currentOrg);
        const orgString = JSON.stringify(currentOrg);
        storeBasedOnPlatform('store', 'organization', orgString);
        removeGame();
        removeSeason();
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
        removeGame();
        const gamesRes = await getGames(organization.orgId, currentSeason.seasonId);
        if (gamesRes) setStep(3);
    };

    const selectGame = (id) => {
        setApiErrors({});
        setErrors({});
        const res = games.find(g => g[0] === id);
        const currentGame = {gameId: res[0], title: res[1], team1Id: res[4], 
                            team2Id: res[5], team1Color: res[2], team2Color: res[3],
                            team1Name: res[6], team2Name: res[7]};
        setGame(currentGame);
        const gameString = JSON.stringify(currentGame);
        storeBasedOnPlatform('store', 'game', gameString);
        navigation.navigate('Home');
    };

    const setRound = (key) => {
        setGames(formatGames(Object.values(tournamentGames[key])));
    };

    return (
        <ScrollView style={[appStyles.app, {paddingTop: 20}]}>
            {Object.keys(errors)[0] ?
                <Errors formErrors={errors}
                        apiErrors={apiErrors}
                        viewStyles={appStyles.errors}
                        textStyles={appStyles.errorText} />
                :
                <View style={[menuStyles.menuSection, {width: '100%', marginTop: 20}]}>
                    {step === 1 &&
                        <SelectList data={userOrgs}
                                    press={selectOrg}
                                    textStyle={appStyles.text} />}
                    {step === 2 &&
                        <SelectList data={seasons}
                                    press={selectSeason}
                                    textStyle={appStyles.text} />}
                    {step === 3 &&
                        <>
                            {tournamentRounds.map(r =>
                                <TouchableOpacity key={r}
                                                onPress={() => setRound(r)}
                                                style={[menuStyles.menuButton, {marginBottom: 20}]}>
                                    <Text style={appStyles.text}>{r}</Text>
                                </TouchableOpacity>)}
                            <SelectList data={games}
                                        press={selectGame}
                                        textStyle={appStyles.text} />
                        </>}
                </View>}
            <View style={[menuStyles.menuSection, {maxHeight: 100, marginTop: 20, marginBottom: 20}]}>
                {step !== 1 &&
                    <TouchableOpacity onPress={() => goToStep(1)}
                                        style={[menuStyles.menuButton, {marginBottom: 25}]}>
                        <Text style={appStyles.text}>Change Organization</Text>
                    </TouchableOpacity>}
                {step > 2 &&
                    <TouchableOpacity onPress={() => goToStep(2)}
                                        style={menuStyles.menuButton}>
                        <Text style={appStyles.text}>Change Season</Text>
                    </TouchableOpacity>}
            </View>
        </ScrollView>
    );
};

export default Select;