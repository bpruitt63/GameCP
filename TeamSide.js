import React, { useContext } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { possessionIcons } from './assets/images/possessionIcons';
import { gameScreenStyles } from './styles/gameScreenStyles';
import { teamColorStyles } from './styles/teamColorStyles';
import { ScoreContext, GameDataContext } from './context';
import Score from './Score';

function TeamSide({scoreIntervals, team, sport, portrait}) {

    const {score, incrementScore, manualSetScore} = useContext(ScoreContext);
    const {gameData} = useContext(GameDataContext);
    const colorStyle = team.color === 'N/A' ? teamColorStyles.NA : teamColorStyles[team.color];
    const teamSideStyle = sport === 'baseball' ? 
                        StyleSheet.compose(gameScreenStyles[`teamSide_home`], colorStyle)
                            :
                        StyleSheet.compose(gameScreenStyles[`teamSide_${team.position}${portrait ? '' : 'Landscape'}`], colorStyle);
    const textStyle = team.color === 'N/A' ? teamColorStyles.NAText : teamColorStyles[`${team.color}Text`];

    const {teamNameParent, teamNameParentLandscape, teamName, teamScore, 
        possessionAndScoreButtonsHome, possessionAndScoreButtonsAway,
        possessionAndScoreButtonsLandscapeHome, possessionAndScoreButtonsLandscapeAway,
        scoreButtons, scoreButtonsLandscape, scoreButton, scoreButtonLandscape,
        possession, possessionIcon} = gameScreenStyles;
    const possessionAndScoreButtonsStyle = portrait && team.position === 'home' ? possessionAndScoreButtonsHome
                            : portrait && team.position === 'away' ? possessionAndScoreButtonsAway
                            : !portrait && team.position === 'home' ? possessionAndScoreButtonsLandscapeHome
                            : possessionAndScoreButtonsAway;

    return(
        <View style={teamSideStyle}>
            <View style={portrait ? teamNameParent : teamNameParentLandscape}>
                <Text style={[teamName, textStyle]}>{team.name}</Text>
                <Score score={score}
                        position={team.position}
                        manualSetScore={manualSetScore}
                        textStyle={textStyle}
                        teamScore={teamScore} />
            </View>
            <View style={possessionAndScoreButtonsStyle}>
                <View style={portrait ? scoreButtons : scoreButtonsLandscape}>
                    {scoreIntervals.map(interval =>
                        <TouchableOpacity key={interval}
                                        style={portrait ? scoreButton : scoreButtonLandscape}
                                        onPress={() => incrementScore(interval, team.position)}>
                            <Text style={textStyle}>{`+${interval}`}</Text>      
                        </TouchableOpacity>)}
                </View>
                <View style={possession}>
                    {sport !== 'baseball' && gameData.possession === team.position &&
                        <img style={possessionIcon}
                            src={possessionIcons[sport]} 
                            alt='Icon indicating possession' />}
                </View>
            </View>
        </View>
    );
};

export default TeamSide;