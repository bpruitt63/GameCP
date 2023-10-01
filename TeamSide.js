import React, { useContext } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { gameScreenStyles, teamColorStyles } from './styles';
import { ScoreContext, GameDataContext } from './context';
import Score from './Score';

function TeamSide({scoreIntervals, team, sport}) {

    const {score, incrementScore, manualSetScore} = useContext(ScoreContext);
    const {gameData} = useContext(GameDataContext);
    const colorStyle = team.color === 'N/A' ? teamColorStyles.NA : teamColorStyles[team.color];
    const teamSideStyle = sport === 'baseball' ? 
                        StyleSheet.compose(gameScreenStyles[`teamSide_home`], colorStyle)
                            :
                        StyleSheet.compose(gameScreenStyles[`teamSide_${team.position}`], colorStyle);
    const textStyle = team.color === 'N/A' ? teamColorStyles.NAText : teamColorStyles[`${team.color}Text`];

    return(
        <View style={teamSideStyle}>
            <View style={gameScreenStyles.teamNameParent}>
                <Text style={[gameScreenStyles.teamName, textStyle]}>{team.name}</Text>
                <Score score={score}
                        position={team.position}
                        manualSetScore={manualSetScore}
                        textStyle={textStyle}
                        teamScore={gameScreenStyles.teamScore} />
            </View>
            <View style={gameScreenStyles.scoreButtons}>
                {scoreIntervals.map(interval =>
                    <TouchableOpacity key={interval}
                                    style={gameScreenStyles.scoreButton}
                                    onPress={() => incrementScore(interval, team.position)}>
                        <Text style={textStyle}>{`+${interval}`}</Text>      
                    </TouchableOpacity>)}
            </View>
            <View style={gameScreenStyles.possession}>
                {sport !== 'baseball' && gameData.possession === team.position &&
                    <Text style={textStyle}>Possession</Text>}
            </View>
        </View>
    );
};

export default TeamSide;