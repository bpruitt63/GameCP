import {createContext} from 'react';

export const TimeContext = createContext({minutes: 20, seconds: 0, periods: 2, sport: 'soccer'})

export const ScoreContext = createContext({homeScore: 0, awayScore: 0});

export const GameDataContext = createContext({possession: 'home', down: 1});

export const UserContext = createContext(null);

export const LoginContext = createContext(null);

export const GameContext = createContext(null);

export const BaseballContext = createContext(null);

export const SportyContext = createContext(null);