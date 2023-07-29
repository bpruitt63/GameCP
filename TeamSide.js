import React, { useContext } from 'react';
import {Text, View, Button} from 'react-native';
import { GameContext, ScoreContext } from './context';

function TeamSide({scoreIntervals, team}) {

    const {score, incrementScore, setScore} = useContext(ScoreContext);

    // const addToScore = (interval) => {
    //     incrementScore(interval, team.position);
    //     storeBasedOnPlatform('store', `${team.position}Score`)
    // };

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