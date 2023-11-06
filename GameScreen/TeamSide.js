import React, { useContext } from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { gameScreenStyles } from '../styles/gameScreenStyles';
import { teamColorStyles } from '../styles/teamColorStyles';
import { ScoreContext, GameDataContext } from '../context';
import Score from './Score';
import { baseballStyles } from '../styles/baseballStyles';

const icons = {
    football: require('../assets/images/football.png'),
    basketball: require('../assets/images/basketball.png'),
    soccer: require('../assets/images/soccer.png')
};

function TeamSide({scoreIntervals, team, sport, portrait}) {

    const {score, incrementScore, manualSetScore} = useContext(ScoreContext);
    const {gameData} = useContext(GameDataContext);
    const colorStyle = team.color === 'N/A' ? teamColorStyles.NA : teamColorStyles[team.color];
    const teamSideStyle = sport === 'baseball' ? [gameScreenStyles.teamSide_home, portrait ? '' : baseballStyles.baseballTeamSideLandscape]
                            :
                        gameScreenStyles[`teamSide_${team.position}${portrait ? '' : 'Landscape'}`];
    const textStyle = team.color === 'N/A' ? teamColorStyles.NAText : teamColorStyles[`${team.color}Text`];

    const {teamNameParent, teamNameParentLandscape, teamName, teamScore, 
        possessionAndScoreButtonsHome, possessionAndScoreButtonsAway,
        possessionAndScoreButtonsLandscapeHome, possessionAndScoreButtonsLandscapeAway,
        scoreButtons, scoreButtonsLandscape, scoreButton, scoreButtonLandscape,
        possession, possessionLandscape, possessionIcon, possessionIconLandscape} = gameScreenStyles;
    const position = sport === 'baseball' ? 'home' : team.position;
    const possessionAndScoreButtonsStyle = portrait && position === 'home' ? possessionAndScoreButtonsHome
                            : portrait && position === 'away' ? possessionAndScoreButtonsAway
                            : !portrait && position === 'home' ? possessionAndScoreButtonsLandscapeHome
                            : possessionAndScoreButtonsLandscapeAway;


    return(
        <View style={teamSideStyle}>
            <View style={[portrait ? teamNameParent : teamNameParentLandscape, colorStyle]}>
                <Text style={[teamName, textStyle]}
                        numberOfLines={2}>
                            {team.name}
                </Text>
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
                                        style={portrait ? [scoreButton, colorStyle] : [scoreButtonLandscape, colorStyle, sport === 'baseball' ? {width: '25%', height: '25%'} : '']}
                                        onPress={() => incrementScore(interval, team.position)}>
                            <Text style={textStyle}>{`+${interval}`}</Text>      
                        </TouchableOpacity>)}
                </View>
                <View style={portrait ? possession : possessionLandscape}>
                    {sport !== 'baseball' && gameData.possession === team.position &&
                        <Image style={portrait ? possessionIcon : possessionIconLandscape}
                            source={icons[sport]} 
                            alt='Icon indicating possession' />}
                </View>
            </View>
        </View>
    );
};

export default TeamSide;