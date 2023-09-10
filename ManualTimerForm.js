import React, {useState} from 'react';
import { TextInput, Button, Text } from 'react-native';

function ManualTimerForm({initialValue, save, cancel}) {

    const [value, setValue] = useState(initialValue);


    const handleMinuteChange = (val) => {
        const newValue = {...value, minutes: val};
        setValue(newValue);
    };

    const handleSecondChange = (val) => {
        const newValue = {...value, seconds: val};
        setValue(newValue);
    };

    return (
        <>
            <TextInput inputMode='numeric'
                maxLength={2}
                onChangeText={handleMinuteChange}
                value={value.minutes} />
            <Text>:</Text>
            <TextInput inputMode='numeric'
                maxLength={2}
                onChangeText={handleSecondChange}
                value={value.seconds} />
            <Button title='Confirm'
                    onPress={() => save(value)} />
            <Button title='Cancel'
                    onPress={cancel} />
        </>
    );
};

export default ManualTimerForm;