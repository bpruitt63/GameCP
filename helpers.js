import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const storeBasedOnPlatform = async (operation, key, value=null) => {
    const isWeb = Platform.OS === 'web';
    switch (operation) {
        case 'store':
            return isWeb ? localStorage.setItem(key, value) 
                        : await SecureStore.setItemAsync(key, value);
        case 'remove':
            return isWeb ? localStorage.removeItem(key) 
                        : await SecureStore.deleteItemAsync(key);
        case 'get':
            return isWeb ? localStorage.getItem(key) 
                        : await SecureStore.getItemAsync(key);
    };
};