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
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    period: {
        height: '20%',
        textAlign: 'center'
    },
    periodFormOpen: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    clockDisplay: {
        height: '80%',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
    },
    periodButton: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#212121',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2%',
        marginTop: '2%',
        borderRadius: 10
    },
    periodOverButtonsContainer: {
        height: '20%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '2%',
        marginTop: '2%'
    },
    periodOverButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#212121',
        borderRadius: 10,
        marginLeft: '5%',
        marginRight: '5%'
    },
    manualQuarterInput: {
        view: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '70%'
        },
        textInput: {
            maxWidth: '30%',
            backgroundColor: 'white',
            borderRadius: 4
        },
        button: {
            backgroundColor: '#212121',
            padding: 5,
            borderRadius: 4
        }
    },
    manualTimerInput: {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            margin: 'auto',
            width: '70%',
            height: '100%'
        },
        view: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%'
        },
        textInput: {
            fontSize: 40,
            maxWidth: '30%',
            backgroundColor: 'white',
            borderRadius: 4
        },
        button: {
            backgroundColor: '#212121',
            padding: 10,
            borderRadius: 4
        }
    }
});