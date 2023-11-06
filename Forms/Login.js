import React, {useState, useContext} from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LoginContext } from '../context';
import { useErrors } from '../helpersAndData/hooks';
import { appStyles } from '../styles/appStyles';
import { loginStyles } from '../styles/loginStyles';
import Errors from '../Errors';
import API from '../Api';

function Login({navigation}) {

    const initialState = {email: '', pwd: ''};
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const {loginUser} = useContext(LoginContext);

    const viewStyles = StyleSheet.compose(appStyles.app, loginStyles.container);

    const handleLogin = async () => {
        setErrors({});
        setApiErrors({});

        if (!validate()) return false;
        try {
            const sendData = {...data, email: data.email.toLowerCase()};
            const token = await API.login(sendData);
            await loginUser(token);
            navigation.navigate('Home');
        } catch (err) {
            getApiErrors(err);
        };
        setData(initialState);
    };

    const validate = () => {
        const validateErrors = {};
        const {email, pwd} = data;
        if (!(email && pwd)) {
            setErrors({error: 'Email and Password Required'});
            return false;
        };
        if (email.length < 6 || email.length > 60) {
            validateErrors.emailLength = 'Email should be between 6 and 60 characters';
        };
        if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            validateErrors.email = "Must be valid email address";
        };
        if (pwd.length < 6 || pwd.length > 60) validateErrors.pwd = 'Password must be between 6 and 60 characters';
        if (Object.keys(validateErrors).length) {
            setErrors(validateErrors);
            return false;
        };
        return true;
    };

    return (
        <View style={viewStyles}>
            <TextInput
                    onChangeText={val => setData(d => { return {...d, email: val}})}
                    name='email'
                    value={data.email}
                    placeholder='Email'
                    style={loginStyles.textInput} />
            <TextInput
                    onChangeText={val => setData(d => { return {...d, pwd: val}})}
                    name='pwd'
                    value={data.pwd}
                    placeholder='Password'
                    secureTextEntry
                    style={loginStyles.textInput} />
            <TouchableOpacity style={loginStyles.button}
                            onPress={handleLogin}>
                <Text style={appStyles.text}>Login</Text>
            </TouchableOpacity>
            {(Object.keys(errors)[0] || Object.keys(apiErrors)[0]) &&
                <Errors formErrors={errors}
                        apiErrors={apiErrors}
                        viewStyles={appStyles.errors}
                        textStyles={appStyles.errorText} />}
        </View>
    );
};

export default Login;