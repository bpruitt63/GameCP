import React, { useContext } from 'react';
import {Text, View, Button} from 'react-native';
import { ScoreContext, GameDataContext } from './context';

function TeamSide({scoreIntervals, team, sport}) {

    const {score, incrementScore, setScore} = useContext(ScoreContext);
    const {gameData} = useContext(GameDataContext);

    return(
        <View>
            <Text>{team.name}</Text>
            <Text>{score[`${team.position}Score`]}</Text>
            {scoreIntervals.map(interval =>
                <Button key={interval}
                        title={`+${interval}`}
                        onPress={() => incrementScore(interval, team.position)} />)}
            {sport !== 'baseball' && gameData.possession === team.position &&
                <Text>Possession</Text>}
        </View>
    );
};

export default TeamSide;