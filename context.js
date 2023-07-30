import {createContext} from 'react';

export const ScoreContext = createContext({homeScore: 0, awayScore: 0});

export const GameDataContext = createContext({possession: 'home', down: 1});

export const UserContext = createContext(null);

export const LoginContext = createContext(null);

export const GameContext = createContext(null);

export const BaseballContext = createContext(null);