import { StyleSheet } from "react-native";


export const timerStyles = StyleSheet.create({
    container: {
        height: '80%'
    },
    clock: {
        height: '80%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    period: {
        height: '20%',
        textAlign: 'center'
    },
    clockDisplay: {
        height: '80%'
    },
    periodButton: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#212121',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2%',
        marginTop: '2%',
        borderRadius: '10%'
    }
});