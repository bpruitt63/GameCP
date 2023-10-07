import { StyleSheet } from "react-native";


const teamSide_home = {
    height: '30%',
    backgroundColor: 'grey'
};
export const gameScreenStyles = StyleSheet.create({
    teamSide_home,
    teamSide_away: {
        ...teamSide_home,
        flexDirection: 'column-reverse'
    }, 
    teamNameParent: {
        height: '20%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
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
    scoreButton: {
        border: '1px solid gray',
        borderRadius: '20%',
        width: '20%',
        height: '50%',
        margin: 'auto',
        textAlign: 'center'
    },
    center: {
        height: '35%'
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