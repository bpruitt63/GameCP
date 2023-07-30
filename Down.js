import React, {useContext} from 'react';
import { Button } from 'react-native';
import { GameDataContext } from './context';

function Down() {

    const {gameData, incrementDown} = useContext(GameDataContext);

    return (
        <Button title={`Down ${gameData.down}`}
                onPress={incrementDown} />
    );
};

export default Down;