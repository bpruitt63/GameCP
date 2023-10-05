import { StyleSheet } from "react-native";


export const timerStyles = StyleSheet.create({
    container: {
        height: '85%'
    },
    clock: {
        height: '80%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    period: {
        height: '20%',
        textAlign: 'center'
    },
    clockDisplay: {
        height: '80%'
    }
});