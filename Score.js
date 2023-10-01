import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ManualInputForm from './ManualInputForm';

function Score({score, position, manualSetScore, textStyle, teamScore}) {

    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        setFormOpen(false);
    }, [score]);

    const save = (val) => {
        const newScore = {...score, [`${position}Score`]: +val};
        manualSetScore(newScore);
        setFormOpen(false);
    };

    const cancel = () => setFormOpen(false);

    return (
        <View style={teamScore}>
            {formOpen ? 
                <ManualInputForm initialValue={score[`${position}Score`].toString()}
                                save={save}
                                cancel={cancel}/>
                :
                <TouchableOpacity onLongPress={() => setFormOpen(true)}>
                    <Text style={textStyle}>{score[`${position}Score`]}</Text>
                </TouchableOpacity>}
        </View>
    );
};

export default Score;