import { StyleSheet } from "react-native";


const teamSide_home = {
    height: '29%',
    backgroundColor: 'grey',
    paddingLeft: '5%',
    paddingRight: '5%',
    display: 'flex',
    flexDirection: 'column'
};
const landscape = {
    height: '100%',
    width: '29%'
};
const scoreButton = {
    border: '1px solid gray',
    borderRadius: 20,
    width: '20%',
    height: '50%',
    margin: 'auto',
    textAlign: 'center',
    justifyContent: 'center'
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
        ...landscape,
        paddingRight: 0,
        paddingLeft: 0
    },
    teamSide_awayLandscape: {
        ...teamSide_home,
        ...landscape,
        paddingRight: 0,
        paddingLeft: 0
    },  
    teamNameParent,
    teamNameParentLandscape: {
        ...teamNameParent,
        height: '15%'
    },
    teamName: {
        flex: 2,
        marginLeft: '10%'
    },
    teamScore: {
        flex: 1,
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
        flexDirection: 'row',
        paddingLeft: '5%',
        paddingBottom: '15%'
    },
    possessionAndScoreButtonsLandscapeAway: {
        height: '85%',
        width: '100%',
        flexDirection: 'row-reverse',
        paddingRight: '5%',
        paddingBottom: '15%'
    },
    possession: {
        height: '15%',
        paddingLeft: 20
    },
    possessionLandscape: {
        height: '100%',
        width: '15%',
        marginTop: '10%'
    },
    scoreButtons: {
        width: '100%',
        height: '85%',
        display: 'flex',
        flexDirection: 'row'
    },
    scoreButtonsLandscape: {
        width: '85%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    scoreButton,
    scoreButtonLandscape: {
        ...scoreButton,
        width: '30%',
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
        height: '20%',
        display: 'flex',
        flexDirection: 'row'
    },
    underTimerChild: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#212121',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2%',
        marginTop: '2%',
        borderRadius: 10
    },
    possessionIcon: {
        maxWidth: 20,
        maxHeight: '80%',
        marginTop: 'auto',
        marginBottom: 'auto',
        flexGrow: .9
    },
    possessionIconLandscape: {
        maxHeight: 19,
        width: 'auto',
        transform: [{rotateZ: '90deg'}],
        flexGrow: 1
    },
    resetContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
    resetContainerLandscape: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    resetButtonLandscape: {
        flex: 1,
        textAlign: 'left',
        justifyContent: 'center',
        backgroundColor: '#212121',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '15%',
        marginTop: '15%',
        borderRadius: 10,
        flexWrap: 'wrap',
        padding: 0
    }
});