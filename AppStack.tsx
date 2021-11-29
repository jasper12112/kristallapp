import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet } from 'react-native';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SingleStateProvider from './utils/SingleStateProvider';

//Make enum and use this to check what screen to load, default (0) = Login.
const Stack = createStackNavigator();
export default function AppStack() {
    const StateProvider = SingleStateProvider.getInstance();

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);

    var userSubscription: any = null;
    var loadingSubscription: any = null;

    useEffect(() => {
        userSubscription = StateProvider.userSubject.subscribe((x: any) => setUser(x));
        loadingSubscription = StateProvider.loadingSubject.subscribe((y: any) => setIsLoading(y));
        
        setIsLoading(StateProvider.getValueForKey('isLoading'));
        setUser(StateProvider.getValueForKey('user'));
        return () => 
        {
            userSubscription ? userSubscription.unsubscribe() : '';
            loadingSubscription ? loadingSubscription.unsubscribe() : '';
         }
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ?
                    (<Stack.Screen name="loading" options={{ headerShown: false }} component={LoadingScreen} />) : user && user !== null && user !== undefined?
                    (<Stack.Screen name="Home" component={HomeScreen} options={headerOpts} />) :
                    (<Stack.Screen name="Login" component={LoginScreen} options={headerOpts} />)
                }
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