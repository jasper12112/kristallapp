import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Button, Pressable } from 'react-native'
import FirebaseUtil from '../utils/FirebaseUtil';

import firestore from '@react-native-firebase/firestore';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Sign in or signup
    const [create, setCreate] = useState(false);

    async function signIn(): Promise<void> {
        const result = await FirebaseUtil.signIn(email, password).catch((e) => {
            console.log(e);
            Alert.alert("Email/Password is wrong!");
        });
    }

    async function signUp(): Promise<void> {
        if (password.length < 6) {
            Alert.alert("Password must have a minimum of 6 characters.");
        }

        if (username.length < 3) {
            Alert.alert("Minimum username length of 3 characters.");
        }

        const result = await FirebaseUtil.signUp(email, password).catch((e) => {
            console.log(e);
            Alert.alert("Something went wrong!");
        });
        if (result) {
            const user = result.user;
            const usersCollection = firestore().collection('users');
            usersCollection.add({
                'uid': user.uid,
                'username': username,
                'email': email,
                'profile-picture': null,
                'admin': false,
                'chat-acces': false,
            });
        }
    }

    return <View style={styles.container}>
        {create ? <TextInput placeholder="Username" onChangeText={setUsername} value={username} style={styles.textInput} /> : <></>}
        <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.textInput} />
        <TextInput placeholder="Password" onChangeText={setPassword} value={password} style={styles.textInput} secureTextEntry={true} />

        {create ?
            <>
                <Pressable style={styles.btn} onPress={() => signUp()}><Text style={[styles.centerText, styles.myAuto]}>Sign up</Text></Pressable>
                <Text style={[styles.text, styles.centerText]} onPress={() => setCreate(false)}>Already have an account? <Text style={styles.textLogin}> Log in</Text></Text>
            </> :
            <>
                <Pressable style={styles.btn} onPress={() => signIn()}><Text style={[styles.centerText, styles.myAuto]}>Sign in</Text></Pressable>
                <Text style={[styles.text, styles.centerText]} onPress={() => setCreate(true)}>Don't have an account? <Text style={styles.textLogin}> Sign up</Text></Text>
            </>}
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111119',
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#282830',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#15151e',
    },
    text: {
        color: '#b3b3b3',
        marginTop: 20,
    },
    textLogin: {
        color: '#ffffff',
        marginTop: 20,
    },
    title: {
        color: '#b1000d',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    centerText: {
        textAlign: 'center',
    },
    btn: {
        borderRadius: 15,
        backgroundColor: '#8c65e6',
        textAlign: 'center',
        height: 40,
    },
    myAuto: {
        marginBottom: 'auto',
        marginTop: 'auto',
    }
})