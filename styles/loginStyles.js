import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 8,
        marginBottom: 40
    },
    button: {
        backgroundColor: '#212121',
        borderRadius: 5,
        padding: 8,
        width: '70%',
        marginBottom: 40
    }
});