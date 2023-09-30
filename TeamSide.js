import React, { useContext } from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import { gameScreenStyles, teamColorStyles } from './styles';
import { ScoreContext, GameDataContext } from './context';
import Score from './Score';

function TeamSide({scoreIntervals, team, sport}) {

    const {score, incrementScore, manualSetScore} = useContext(ScoreContext);
    const {gameData} = useContext(GameDataContext);
    const colorStyle = team.color === 'N/A' ? teamColorStyles.NA : teamColorStyles[team.color];
    const teamSideStyle = StyleSheet.compose(gameScreenStyles.teamSide, colorStyle);
    const textStyle = team.color === 'N/A' ? teamColorStyles.NAText : teamColorStyles[`${team.color}Text`];

    return(
        <View style={teamSideStyle}>
            <Text style={textStyle}>{team.name}</Text>
            <Score score={score}
                    position={team.position}
                    manualSetScore={manualSetScore}
                    textStyle={textStyle} />
            {scoreIntervals.map(interval =>
                <Button key={interval}
                        title={`+${interval}`}
                        onPress={() => incrementScore(interval, team.position)} />)}
            <View style={gameScreenStyles.possession}>
                {sport !== 'baseball' && gameData.possession === team.position &&
                    <Text style={textStyle}>Possession</Text>}
            </View>
        </View>
    );
};

export default TeamSide;