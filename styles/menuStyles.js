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
    homeScreenMainSection: {
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
    }
})