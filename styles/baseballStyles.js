import { StyleSheet } from "react-native";


export const baseballStyles = StyleSheet.create({
    baseballTeamSideLandscape: {
        height: '100%',
        width: '47%'
    },  
    buttonsAndFielders: {
        height: '61%',
        display: 'flex',
        flexDirection: 'column'
    }, 
    buttonsAndFieldersLandscape: {
        height: '100%',
        width: '46%',
        flexDirection: 'column-reverse'
    },
    incrementButtons: {
        height: '89%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 15
    },
    incrementButtonsLandscape: {
        height: '85%'
    },
    button: {
        backgroundColor: '#212121',
        height: '15%',
        justifyContent: 'center',
        width: '70%',
        borderRadius: 10
    },
    submitAndReset: {
        height: '10%'
    }
});