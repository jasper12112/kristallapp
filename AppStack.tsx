import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginContext } from './utils/LoginProvider';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();
export default function AppStack() {
    const {user, isLoading} = useContext(LoginContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ? 
                (<Stack.Screen name="loading" options={{headerShown: false}} component={LoadingScreen}/>) : user ? 
                (<Stack.Screen name="Home" component={HomeScreen}/>) :
                (<Stack.Screen name="Login" component={LoginScreen}/>) }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
