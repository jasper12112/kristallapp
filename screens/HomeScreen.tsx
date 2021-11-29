import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Alert, TextInput, Pressable } from 'react-native'

import FirebaseUtil from '../utils/FirebaseUtil';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import SingleStateProvider from '../utils/SingleStateProvider';

export default function HomeScreen() {
    const StateProvider = SingleStateProvider.getInstance();

    const [user, setUser] = useState<any>();

    var subscribed: any = null;

    enum usedViews {
        Home,
        Profile,
    }

    const [currentView, setCurrentView] = useState<usedViews>(usedViews.Home);

    const signOut = () => {
        FirebaseUtil.signOut().catch((e) => {
            console.log(e);
            Alert.alert("Something went wrong!");
        });
    }

    useEffect(() => {
        subscribed = StateProvider.userSubject.subscribe((x: any) => setUser(x));
        setUser(StateProvider.getValueForKey('user'));
        return () => { 
            if (subscribed !== null)
            {
                subscribed.unsubscribe();
            }
         }
    }, []);

    return (
        <View style={styles.container}>

            {currentView == usedViews.Profile ?
                (<View>
                    <View style={[styles.mt10]}>
                        <Text style={[styles.title, styles.white]}>{user?.username}</Text>
                    </View>
                    <View style={[styles.height100, styles.mt40]}>
                        <View style={[styles.flex, styles.row]}>
                            <FontAwesomeIcon color="#fdfdfd" size={32} secondaryColor="#fdfdfd" icon={ faEnvelope } />
                            <Text style={[styles.infoText, styles.ml12, styles.bold, styles.myauto, styles.white]}>{user?.email}</Text>
                        </View>
                        <View style={[styles.flex, styles.row, styles.mt10]}>
                            <FontAwesomeIcon color="#fdfdfd" size={32} secondaryColor="#fdfdfd" icon={ faEnvelope } />
                            <Text style={[styles.infoText, styles.ml12, styles.bold, styles.myauto, styles.white]}>{user?.email}</Text>
                        </View>
                        <Button onPress={() => setCurrentView(usedViews.Home)} title="HomePage"></Button>
                    </View>
                </View>)
                : (<></>)
            }

            {
                currentView == usedViews.Home ?
                    (<View style={[styles.centerItemsY, styles.height100]}>
                        <Text style={[styles.white]}> Home: </Text>
                        <Button onPress={() => signOut()} title="Logout"></Button>
                        <Button onPress={() => setCurrentView(usedViews.Profile)} title="ProfilePage"></Button>
                    </View>)
                    : (<></>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    centerItemsY: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    flex:{
        display: 'flex',
    },
    row: {
        flexDirection: 'row',
    },
    height100: {
        height: '100%',
    },
    myauto: {
        marginBottom: 'auto',
        marginTop: 'auto',
    },
    container: {
        flex: 1,
        backgroundColor: '#111119',
        padding: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    infoText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileContainer: {
        marginBottom: 'auto',
    },
    bold: {
        fontWeight: 'bold',
    },
    mb2: {
        marginBottom: 2,
    },
    mt10: {
        marginTop: 10,
    },
    mt40: {
        marginTop: 40,
    },
    ml4:{
        marginLeft: 4,
    },
    ml12:{
        marginLeft: 12,
    },
    white:{
        color: '#fff',
    },
});