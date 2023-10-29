import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { gameScreenStyles } from './styles/gameScreenStyles';
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
                                cancel={cancel}
                                textStyle={[textStyle, {color: 'white'}]}
                                formStyle={gameScreenStyles.manualScoreInput} />
                :
                <TouchableOpacity onLongPress={() => setFormOpen(true)}>
                    <Text style={[textStyle, {textAlign: 'right'}]}>
                        {score[`${position}Score`]}
                    </Text>
                </TouchableOpacity>}
        </View>
    );
};

export default Score;