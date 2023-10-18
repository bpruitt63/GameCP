import { StyleSheet, StatusBar } from "react-native";


export const headerStyles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        marginTop: StatusBar.currentHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: 'darkgray',
        alignItems: 'center'
    },
    headerButtonText: {
        color: 'white',
        fontSize: 20
    },
    headerTitleText: {
        color: 'white',
        fontSize: 15
    }
});