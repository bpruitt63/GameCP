import React, {useContext} from "react";
import { Button } from "react-native";
import { GameDataContext } from "./context";

function Possession() {

    const {changePossession} = useContext(GameDataContext);

    return (
        <Button title='Change Possession'
                onPress={changePossession} />
    );
};

export default Possession;