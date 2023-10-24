import { StyleSheet } from "react-native";


const gameData = {
    backgroundColor: '#212121',
    paddingTop: 1,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
};
export const menuStyles = StyleSheet.create({
    gameData,
    gameDataLandscape: {
        ...gameData,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    gameDataItem: {
        paddingTop: 5,
        minWidth: 200
    },
    homeScreenMain: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1
    },
    menuSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        alignItems: 'center'
    },
    menuButton: {
        backgroundColor: '#212121',
        borderRadius: 5,
        padding: 8,
        width: '70%'
    },
    selectList: {
        width: '100%', 
        borderBottomColor: '#212121', 
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingBottom: 25,
        marginTop: 20
    },
    periodSettings: {
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
    timerSettings: {
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '70%'
        },
        view: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '50%'
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
    }
})