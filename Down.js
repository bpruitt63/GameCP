import React, {useContext, useState, useEffect} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GameDataContext } from './context';
import ManualInputForm from './ManualInputForm';

function Down({textStyle}) {

    const {gameData, incrementDown, manualDataChange} = useContext(GameDataContext);
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        setFormOpen(false);
    }, [gameData]);

    const save = (val) => {
        const newData = {...gameData, down: +val};
        manualDataChange(newData);
        setFormOpen(false);
    };

    return (
        <>
            {formOpen ? 
                <>  
                    <Text style={textStyle}>Down</Text>
                    <ManualInputForm initialValue={gameData.down.toString()}
                                        save={save}
                                        cancel={() => setFormOpen(false)} />
                </>
                :
                <TouchableOpacity onPress={incrementDown}
                                    onLongPress={() => setFormOpen(true)}>
                    <Text style={textStyle}>{`Down ${gameData.down}`}</Text>
                </TouchableOpacity>
            }  
        </>
    );
};

export default Down;