import React from 'react';
import {View, Button, Text} from 'react-native';

function SelectList({data, press}) {

    return (
        <View>
            {data.map(d => 
                <Button key={d[0]}
                        title={d[1]}
                        onPress={() => press(d[0])} />)}
        </View>
    );
};

export default SelectList;