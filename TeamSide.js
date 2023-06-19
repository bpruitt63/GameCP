import React from 'react';
import {Text, View, Button} from 'react-native';

function TeamSide({scoreIntervals, team, score, incrementScore}) {

    return(
        <View>
            <Text>{team.name}</Text>
            <Text>{score}</Text>
            {scoreIntervals.map(interval =>
                <Button key={interval}
                        title={`+${interval}`}
                        onPress={() => incrementScore(interval, team.position)} />)}
        </View>
    );
};

export default TeamSide;