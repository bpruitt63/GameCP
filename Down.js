import React, {useContext, useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GameDataContext } from './context';
import ManualInputForm from './ManualInputForm';

function Down() {

    const {gameData, incrementDown, manualDataChange} = useContext(GameDataContext);
    const [formOpen, setFormOpen] = useState(false);

    const save = (val) => {
        const newData = {...gameData, down: +val};
        manualDataChange(newData);
        setFormOpen(false);
    };

    return (
        <>
            {formOpen ? 
                <ManualInputForm initialValue={gameData.down.toString()}
                                    save={save}
                                    cancel={() => setFormOpen(false)} />
                :
                <TouchableOpacity onPress={incrementDown}
                                    onLongPress={() => setFormOpen(true)}>
                    <Text>{`Down ${gameData.down}`}</Text>
                </TouchableOpacity>
            }  
        </>
    );
};

export default Down;