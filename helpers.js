import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const storeBasedOnPlatform = async (operation, key, value=null) => {
    const isWeb = Platform.OS === 'web';
    switch (operation) {
        case 'store':
            return isWeb ? localStorage.setItem(key, value) 
                        : await SecureStore.setItemAsync(key, value);
        case 'remove':
            return isWeb ? localStorage.removeItem(key) 
                        : await SecureStore.deleteItemAsync(key);
        case 'get':
            return isWeb ? localStorage.getItem(key) 
                        : await SecureStore.getItemAsync(key);
    };
};

export const checkStorageOnLogin = async (setters) => {
    await getOrg(setters.setOrganization);
    await getSeason(setters.setSeason);
    await getGame(setters.setGame);
};

export const retrieveStoredData = async (setters) => {
    await getScore(setters.setScore);
    await getGameData(setters.setGameData);
    await getBaseballData(setters.setBaseballData);
    await getTime(setters.setTime);
};

const getOrg = async (setOrganization) => {
    const storedOrg = await storeBasedOnPlatform('get', 'organization');
    if (storedOrg) setOrganization(JSON.parse(storedOrg));
};

const getSeason = async (setSeason) => {
    const storedSeason = await storeBasedOnPlatform('get', 'season');
    if (storedSeason) setSeason(JSON.parse(storedSeason));
};

const getGame = async (setGame) => {
    const storedGame = await storeBasedOnPlatform('get', 'game');
    if (storedGame) setGame(JSON.parse(storedGame));
};

const getScore = async (setScore) => {
    const storedScore = await storeBasedOnPlatform('get', 'score');
    if (storedScore) setScore(JSON.parse(storedScore));
};

const getGameData = async (setGameData) => {
    const storedGameData = await storeBasedOnPlatform('get', 'gameData');
    if (storedGameData) setGameData(JSON.parse(storedGameData));
};

const getBaseballData = async (setBaseballData) => {
    const storedBaseballData = await storeBasedOnPlatform('get', 'baseballData');
    if (storedBaseballData) setBaseballData(JSON.parse(storedBaseballData));
};

const getTime = async (setTime) => {
    const storedTime = await storeBasedOnPlatform('get', 'time');
    if (storedTime) setTime(JSON.parse(storedTime));
};