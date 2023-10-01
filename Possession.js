import React, {useContext} from "react";
import { TouchableOpacity, Text } from "react-native";
import { GameDataContext } from "./context";

function Possession({mainStyle, textStyle}) {

    const {changePossession} = useContext(GameDataContext);

    return (
        <TouchableOpacity style={mainStyle}
                        onPress={changePossession}>
            <Text style={textStyle}>Change Possession</Text>
        </TouchableOpacity>
    );
};

export default Possession;