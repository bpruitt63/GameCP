import { StyleSheet } from "react-native";


export const baseballStyles = StyleSheet.create({
    incrementButtons: {
        height: '55%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 15
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