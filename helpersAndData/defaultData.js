export const defaultData = {
    soccer: {minutes: 20, 
            seconds: 0, 
            period: 1, 
            maxPeriod: 2, 
            scoreIntervals: [1], 
            gameOver: false,
            gameOverFinal: false,
            regulation: true},
    football: {minutes: 12, 
            seconds: 0, 
            period: 1, 
            maxPeriod: 4, 
            scoreIntervals: [1, 2, 3, 6], 
            gameOver: false,
            gameOverFinal: false,
            regulation: true},
    basketball: {minutes: 8, 
            seconds: 0, 
            period: 1, 
            maxPeriod: 4, 
            scoreIntervals: [1, 2, 3], 
            gameOver: false,
            gameOverFinal: false,
            regulation: true},
    baseball: {balls: 0, 
                strikes: 0, 
                outs: 0, 
                inning: 1, 
                top: true, 
                length: 9, 
                gameOver: false}    
};