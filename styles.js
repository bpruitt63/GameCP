import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
    app: {
        backgroundColor: 'black',
        flex: 1
    },
    text: {
        color: 'white'
    }
});

const teamSide_home = {
    height: '30%',
    backgroundColor: 'grey'
};
export const gameScreenStyles = StyleSheet.create({
    teamSide_home,
    teamSide_away: {
        ...teamSide_home,
        flexDirection: 'column-reverse'
    }, 
    teamNameParent: {
        display: 'flex',
        flexDirection: 'row'
    },
    teamName: {
        flex: '3',
        marginLeft: '10%'
    },
    teamScore: {
        flex: '1',
        textAlign: 'right',
        marginRight: '10%'
    },
    possession: {
        height: '15%'
    },
    scoreButtons: {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'row'
    },
    scoreButton: {
        border: '1px solid black',
        width: '20%',
        height: '80%',
        margin: 'auto',
        textAlign: 'center'
    }
});

export const teamColorStyles = StyleSheet.create({
    black: {
        backgroundColor: 'black'
    },
    blackText: {
        color: 'white'
    },
    white: {
        backgroundColor: 'white',
    },
    whiteText: {
        color: 'black'
    },
    gray: {
        backgroundColor: 'gray'
    },
    grayText: {
        color: 'black'
    },
    red: {
        backgroundColor: 'red'
    },
    redText: {
        color: 'white'
    },
    orange: {
        backgroundColor: 'orange'
    },
    orangeText: {
        color: 'black'
    },
    yellow: {
        backgroundColor: 'yellow',
    },
    yellowText: {
        color: 'black'
    },
    blue: {
        backgroundColor: 'blue'
    },
    blueText: {
        color: 'white'
    },
    green: {
        backgroundColor: 'green'
    },
    greenText: {
        color: 'white'
    },
    purple: {
        backgroundColor: 'purple'
    },
    purpleText: {
        color: 'white'
    },
    NA: {
        backgroundColor: 'gray'
    },
    NAText: {
        color: 'white'
    }
})