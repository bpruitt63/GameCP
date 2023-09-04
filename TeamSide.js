import React, { useContext } from 'react';
import {Text, View, Button} from 'react-native';
import { ScoreContext, GameDataContext } from './context';
import Score from './Score';

function TeamSide({scoreIntervals, team, sport}) {

    const {score, incrementScore, manualSetScore} = useContext(ScoreContext);
    const {gameData} = useContext(GameDataContext);

    return(
        <View>
            <Text>{team.name}</Text>
            <Score score={score}
                    position={team.position}
                    manualSetScore={manualSetScore} />
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