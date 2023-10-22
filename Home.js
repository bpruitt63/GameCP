import React, {useContext, useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import { appStyles } from './styles/appStyles';
import { menuStyles } from './styles/menuStyles';
import { GameContext, LoginContext, UserContext } from './context';


function Home({navigation}) {

        const user = useContext(UserContext);
        const {organization, season, game} = useContext(GameContext);
        const {logoutUser} = useContext(LoginContext);
        const {height, width} = useWindowDimensions();
        const [portrait, setPortrait] = useState(height > width);

        const dataTextStyle = StyleSheet.compose(appStyles.text, menuStyles.gameDataItem);

        useEffect(() => {
            setPortrait(height > width);
        }, [height, width]);

    return (
        <View style={appStyles.app}>
            {user &&
                <View style={portrait ? menuStyles.gameData : menuStyles.gameDataLandscape}>
                    <Text style={dataTextStyle}>{`${user.firstName} ${user.lastName}`}</Text>
                    {organization &&
                        <Text style={dataTextStyle}>{organization.orgName}</Text>}
                    {season &&
                        <Text style={dataTextStyle}>{season.title}</Text>}
                    {game &&
                        <Text style={dataTextStyle}>{game.title}</Text>}
                </View>}
            <View style={[menuStyles.homeScreenMain, portrait ? '' : {flexDirection: 'row'}]}>
                <View style={menuStyles.menuSection}>
                    <Text style={[appStyles.text, {fontSize: 18}]}>Select a sport</Text>
                    <TouchableOpacity style={menuStyles.menuButton}
                                    onPress={() => navigation.navigate('Game', {sport: 'basketball', title: 'Basketball'})}>
                        <Text style={appStyles.text}>Basketball</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity style={menuStyles.menuButton}
                                    onPress={() => navigation.navigate('Game', {sport: 'football', title: 'Football'})}>
                        <Text style={appStyles.text}>Football</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity style={menuStyles.menuButton}
                                    onPress={() => navigation.navigate('Game', {sport: 'soccer', title: 'Soccer'})}>
                        <Text style={appStyles.text}>Soccer</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity style={menuStyles.menuButton}
                                    onPress={() => navigation.navigate('Baseball')}>
                        <Text style={appStyles.text}>Baseball</Text>    
                    </TouchableOpacity>
                </View>
                <View style={menuStyles.menuSection}>
                    <Text style={[appStyles.text, {fontSize: 18}]}>Or</Text>
                    {user ? 
                        <>
                            <TouchableOpacity style={menuStyles.menuButton}
                                    onPress={() => navigation.navigate('Select')}>
                                <Text style={appStyles.text}>Select or Change Game</Text>    
                            </TouchableOpacity>
                            <TouchableOpacity style={menuStyles.menuButton}
                                    onPress={logoutUser}>
                                <Text style={appStyles.text}>Log Out</Text>    
                            </TouchableOpacity>
                        </>
                        :
                        <TouchableOpacity style={menuStyles.menuButton}
                                        onPress={() => navigation.navigate('Login')}>
                            <Text style={appStyles.text}>Log in to Sporty</Text>
                        </TouchableOpacity> 
                    }
                    <TouchableOpacity style={menuStyles.menuButton}
                                    onPress={() => navigation.navigate('Settings')}>
                        <Text style={appStyles.text}>Set Defaults</Text>
                </TouchableOpacity> 
                </View>
            </View>
        </View>
    );
};

export default Home;