import React,{useState} from 'react';
import {View, Text} from 'react-native';
import TeamSide from './TeamSide';

function Basketball() {

    const scoreIntervals = [1, 2, 3];
    const [homeTeam, setHomeTeam] = useState({name: 'Home', position: 'home'});
    const [awayTeam, setAwayTeam] = useState({name: 'Away', position: 'away'});

    return (
        <View>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={homeTeam} />
            <Text>Timer goes here</Text>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam} />
        </View>
    );
};

export default Basketball;