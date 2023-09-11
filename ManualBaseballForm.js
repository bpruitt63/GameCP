import React, {useState} from 'react';
import { TextInput, Button } from 'react-native';

function ManualBaseballForm({initialValue, save, cancel}) {

    const [value, setValue] = useState(initialValue);

    const toggle = () => {
        const newValue = {...value, top: !value.top};
        setValue(newValue);
    };

    const handleChange = (val) => {
        const newValue = {...value, inning: val};
        setValue(newValue);
    };

    return (
        <>
            <Button title={value.top ? 'Top' : 'Bottom'}
                    onPress={toggle} />
            <TextInput inputMode='numeric'
                        onChangeText={handleChange}
                        value={value.inning}
                        autoFocus
                        selectTextOnFocus />
            <Button title='Confirm'
                    onPress={() => save(value)} />
            <Button title='Cancel'
                    onPress={cancel} />
        </>
    );
};

export default ManualBaseballForm;