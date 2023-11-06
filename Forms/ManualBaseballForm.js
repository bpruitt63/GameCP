import React, {useState} from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { manualBaseballStyles } from '../styles/manualBaseballStyles';

function ManualBaseballForm({initialValue, save, cancel, textStyle}) {

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
        <View style={manualBaseballStyles.view}>
            <TouchableOpacity onPress={toggle}
                            style={manualBaseballStyles.button}>
                <Text style={textStyle}>{value.top ? 'Top' : 'Bottom'}</Text>    
            </TouchableOpacity>
            <TextInput inputMode='numeric'
                        onChangeText={handleChange}
                        value={value.inning.toString()}
                        style={manualBaseballStyles.textInput}
                        autoFocus
                        selectTextOnFocus />
            <TouchableOpacity onPress={() => save(value)}
                            style={manualBaseballStyles.button}>
                <Text style={textStyle}>Confirm</Text>    
            </TouchableOpacity>
            <TouchableOpacity onPress={cancel}
                            style={manualBaseballStyles.button}>
                <Text style={textStyle}>Cancel</Text>    
            </TouchableOpacity>
        </View>
    );
};

export default ManualBaseballForm;