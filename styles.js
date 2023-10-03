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
        height: '20%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    teamName: {
        flex: '2',
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
        height: '65%',
        display: 'flex',
        flexDirection: 'row'
    },
    scoreButton: {
        border: '1px solid gray',
        borderRadius: '20%',
        width: '20%',
        height: '50%',
        margin: 'auto',
        textAlign: 'center'
    },
    center: {
        height: '35%'
    },
    underTimer: {
        height: '15%',
        display: 'flex',
        flexDirection: 'row'
    },
    underTimerChild: {
        flex: '1',
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
});

export const timerStyles = StyleSheet.create({
    container: {
        height: '85%'
    },
    clock: {
        height: '80%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    period: {
        height: '20%',
        textAlign: 'center'
    },
    clockDisplay: {
        height: '80%'
    }
});