import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';
import API from './Api';

function Login() {

    const [data, setData] = useState(null);

    const test = async () => {
        const info = await API.test();
        setData(info);
        console.log(info);
    };

    return (
        <View>
            <Button title='test'
                    onPress={test} />
        </View>
    );
};

export default Login;