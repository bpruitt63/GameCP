import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Timer from './Timer';
import TeamSide from './TeamSide';

function Soccer() {

    const defaultValues = {minutes: 20, seconds: 0, centiseconds: 0, periods: 2};
    const scoreIntervals = [1];
    const [homeTeam, setHomeTeam] = useState({name: 'Home', position: 'home'});
    const [awayTeam, setAwayTeam] = useState({name: 'Away', position: 'away'});

    return (
        <View>
            {/* <Timer defaultValues={defaultValues} /> */}
            <TeamSide scoreIntervals={scoreIntervals}
                        team={homeTeam} />
            <Text>Timer goes here</Text>
            <TeamSide scoreIntervals={scoreIntervals}
                        team={awayTeam} />
        </View>
    );
};

export default Soccer;