import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import ManualInputForm from './ManualInputForm';

function Score({score, position, manualSetScore}) {

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
        <>
            {formOpen ? 
                <ManualInputForm initialValue={score[`${position}Score`].toString()}
                                save={save}
                                cancel={cancel}/>
                :
                <TouchableOpacity onLongPress={() => setFormOpen(true)}>
                    {score[`${position}Score`]}
                </TouchableOpacity>}
        </>
    );
};

export default Score;