import { StyleSheet } from "react-native";


const teamSide_home = {
    height: '30%',
    backgroundColor: 'grey',
    paddingLeft: '5%',
    paddingRight: '5%',
    display: 'flex',
    flexDirection: 'column'
};
const landscape = {
    height: '100%',
    width: '30%'
};
const scoreButton = {
    border: '1px solid gray',
    borderRadius: '20%',
    width: '20%',
    height: '50%',
    margin: 'auto',
    textAlign: 'center'
};
const teamNameParent = {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
};
export const gameScreenStyles = StyleSheet.create({
    teamSide_home,
    teamSide_away: {
        ...teamSide_home,
        flexDirection: 'column-reverse'
    },
    teamSide_homeLandscape: {
        ...teamSide_home,
        ...landscape
    },
    teamSide_awayLandscape: {
        ...teamSide_home,
        ...landscape,
        flexDirection: 'row-reverse'
    },  
    teamNameParent,
    teamNameParentLandscape: {
        ...teamNameParent,
        height: '15%'
    },
    teamName: {
        flex: '2',
        marginLeft: '10%'
    },
    teamScore: {
        flex: '1',
        textAlign: 'right',
        marginRight: '10%'
    },
    possessionAndScoreButtonsHome: {
        height: '80%',
        width: '100%',
        flexDirection: 'column'
    },
    possessionAndScoreButtonsAway: {
        height: '80%',
        width: '100%',
        flexDirection: 'column-reverse'
    },
    possessionAndScoreButtonsLandscapeHome: {
        height: '85%',
        width: '100%',
        flexDirection: 'row'
    },
    possessionAndScoreButtonsLandscapeAway: {
        height: '85%',
        width: '100%',
        flexDirection: 'row-reverse'
    },
    possession: {
        height: '15%',
        paddingLeft: '20px'
    },
    scoreButtons: {
        width: '100%',
        height: '65%',
        display: 'flex',
        flexDirection: 'row'
    },
    scoreButtonsLandscape: {
        height: '80%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    scoreButton,
    scoreButtonLandscape: {
        ...scoreButton,
        width: '50%',
        height: '20%',
    },
    center: {
        height: '35%'
    },
    centerLandscape: {
        height: '100%',
        width: '35%'
    },
    underTimer: {
        height: '15%',
        display: 'flex',
        flexDirection: 'row'
    },
    underTimerChild: {
        flex: '1',
        textAlign: 'center'
    },
    possessionIcon: {
        maxWidth: '40px',
        height: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});