import React, {useState, useContext, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import { GameContext, UserContext } from './context';

function Select() {

    const [step, setStep] = useState(1);
    const user = useContext(UserContext);
    const {organization, setOrganization, season, 
            setSeason, game, setGame} = useContext(GameContext);

    useEffect(() => {
        const getCurrentStep = () => {
            if (game) {
                setStep(4);
            } else if (season) {
                setStep(3);
            } else if (organization) {
                setStep(2);
            };
        };
        getCurrentStep();
    }, [setStep]);

    return (
        <View>
            <Text>{step}</Text>

            {step > 1 &&
                <Button title='Change Organization'
                        onPress={() => setStep(1)} />}
            {step > 2 &&
                <Button title='Change Season'
                        onPress={() => setStep(2)} />}
            {step > 3 &&
                <Button title='Change Game'
                        onPress={() => setStep(3)} />}
        </View>
    );
};

export default Select;