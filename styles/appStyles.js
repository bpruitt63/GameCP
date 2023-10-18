import { StyleSheet } from "react-native";


const app = {
    backgroundColor: 'black',
    flex: 1
};
export const appStyles = StyleSheet.create({
    app,
    landscape: {
        ...app,
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        color: 'white'
    }
});