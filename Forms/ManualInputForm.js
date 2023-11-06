import React, {useState} from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';

function ManualInputForm({initialValue, save, cancel, textStyle, formStyle}) {

    const [value, setValue] = useState(initialValue);

    const handleChange = (val) => setValue(val);

    return (
        <View style={formStyle.view}>
            <TextInput inputMode='numeric'
                        onChangeText={handleChange}
                        value={value}
                        autoFocus
                        selectTextOnFocus
                        style={formStyle.textInput} />
            <TouchableOpacity onPress={() => save(value)}
                                style={formStyle.button}>
                <Text style={textStyle}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancel}
                                style={formStyle.button}>
                <Text style={textStyle}>Cancel</Text>    
            </TouchableOpacity>
        </View>
    );
};

export default ManualInputForm;