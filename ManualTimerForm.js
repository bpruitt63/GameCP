import React, {useState, useRef} from 'react';
import { TextInput, Button, Text } from 'react-native';

function ManualTimerForm({initialValue, save, cancel}) {

    const [value, setValue] = useState(initialValue);
    const ref1 = useRef();
    const ref2 = useRef();

    const handleMinuteChange = (val) => {
        const newValue = {...value, minutes: val};
        setValue(newValue);
        if (newValue.minutes.length >= 2) ref2.current.focus();
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
                value={value.minutes}
                autoFocus
                selectTextOnFocus
                ref={ref1} />
            <Text>:</Text>
            <TextInput inputMode='numeric'
                maxLength={2}
                onChangeText={handleSecondChange}
                value={value.seconds}
                selectTextOnFocus
                ref={ref2} />
            <Button title='Confirm'
                    onPress={() => save(value)} />
            <Button title='Cancel'
                    onPress={cancel} />
        </>
    );
};

export default ManualTimerForm;