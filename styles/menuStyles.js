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
    }
})