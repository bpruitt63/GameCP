import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useOnline } from '../helpersAndData/hooks';
import { menuStyles } from '../styles/menuStyles';

function SubmitScores({submitScores, buttonStyle, textStyle}) {

    const [online, watchOnlineStatus] = useOnline(navigator.onLine);

    useEffect(() => {
        watchOnlineStatus();
    }, [watchOnlineStatus]);

    return (
        <TouchableOpacity onPress={submitScores}
                        style={[buttonStyle, !online ? menuStyles.disabled : '']}
                        disabled={!online}>
            <Text style={textStyle}>Save to Sporty</Text>
            {!online && <Text style={textStyle}>Online Connection Required</Text>}    
        </TouchableOpacity>
    );
};

export default SubmitScores;