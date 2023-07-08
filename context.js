import {createContext} from 'react';

export const ScoreContext = createContext({homeScore: 0, awayScore: 0});

export const UserContext = createContext(null);

export const LoginContext = createContext(null);