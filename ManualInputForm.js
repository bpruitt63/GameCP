import React, {useState} from 'react';
import { TextInput, Button } from 'react-native';

function ManualInputForm({initialValue, save, cancel}) {

    const [value, setValue] = useState(initialValue);

    const handleChange = (val) => setValue(val);

    return (
        <>
            <TextInput inputMode='numeric'
                        onChangeText={handleChange}
                        value={value}
                        autoFocus
                        selectTextOnFocus />
            <Button title='Confirm'
                    onPress={() => save(value)} />
            <Button title='Cancel'
                    onPress={cancel} />
        </>
    );
};

export default ManualInputForm;