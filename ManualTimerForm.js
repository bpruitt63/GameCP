import React, {useState, useRef} from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

function ManualTimerForm({initialValue, save, cancel, textStyle, formStyle}) {

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
        <View style={formStyle.container}>
            <View style={formStyle.view}>
                <TextInput inputMode='numeric'
                    maxLength={2}
                    onChangeText={handleMinuteChange}
                    value={value.minutes}
                    autoFocus
                    selectTextOnFocus
                    ref={ref1}
                    style={formStyle.textInput} />
                <Text style={textStyle}>:</Text>
                <TextInput inputMode='numeric'
                    maxLength={2}
                    onChangeText={handleSecondChange}
                    value={value.seconds}
                    selectTextOnFocus
                    ref={ref2}
                    style={formStyle.textInput} />
            </View>
            <View style={formStyle.view}>
                <TouchableOpacity style={formStyle.button}
                                onPress={() => save(value)}>
                    <Text style={textStyle}>Confirm</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={formStyle.button}
                                onPress={cancel}>
                    <Text style={textStyle}>Cancel</Text>                    
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ManualTimerForm;