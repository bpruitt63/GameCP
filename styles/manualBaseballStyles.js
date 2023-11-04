import { StyleSheet } from "react-native";


export const manualBaseballStyles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 4,
        maxWidth: '20%'
    },
    button: {
        backgroundColor: '#212121',
        padding: 10,
        borderRadius: 4
    }
});