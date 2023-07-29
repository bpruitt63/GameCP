import React, { useContext } from 'react';
import {Text, View, Button} from 'react-native';
import { ScoreContext } from './context';

function TeamSide({scoreIntervals, team}) {

    const {score, incrementScore, setScore} = useContext(ScoreContext);

    return(
        <View>
            <Text>{team.name}</Text>
            <Text>{score[`${team.position}Score`]}</Text>
            {scoreIntervals.map(interval =>
                <Button key={interval}
                        title={`+${interval}`}
                        onPress={() => incrementScore(interval, team.position)} />)}
        </View>
    );
};

export default TeamSide;