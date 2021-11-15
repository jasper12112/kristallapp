import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginContext } from './utils/LoginProvider';

import { StyleSheet } from 'react-native';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { color } from 'react-native-reanimated';

//Make enum and use this to check what screen to load, default (0) = Login.
const Stack = createStackNavigator();
export default function AppStack() {
    const { user, isLoading } = useContext(LoginContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ?
                    (<Stack.Screen name="loading" options={{ headerShown: false }} component={LoadingScreen} />) : user ?
                        (<Stack.Screen name="Home" component={HomeScreen} options={headerOpts} />) :
                        (<Stack.Screen name="Login" component={LoginScreen} options={headerOpts} />)}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    bgcolor: {
        backgroundColor: '#191925',
    }
})

const headerOpts = {
    headerStyle: {
        backgroundColor: '#111119'
    },
    headerTitleStyle: {
        color: 'white'
    },
    white:{
        color: '#fff',
    },
}