import { StyleSheet } from "react-native";


const app = {
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
    maxWidth: 900,
    marginLeft: 'auto',
    marginRight: 'auto'
};
export const appStyles = StyleSheet.create({
    app,
    landscape: {
        ...app,
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    textLandscape: {
        width: 124, 
        height: 42, 
        transform: [{rotateZ: '270deg'}, {translateY: -31}]
    },
    errors: {
        backgroundColor: 'gray',
        textAlign: 'center',
        padding: 8,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 3
    },
    errorText: {
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center'
    },
    sportyError: {
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        zIndex: 5
    }
});