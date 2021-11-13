import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Alert, Button} from 'react-native'
import FirebaseUtil from '../utils/FirebaseUtil';

import firestore from '@react-native-firebase/firestore';

export default function LoginScreen()
{
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    //Sign in or signup
    const [create, setCreate] = useState(false);

    async function signIn(): Promise<void> {
        const result = await FirebaseUtil.signIn(email, password).catch((e) =>{
            console.log(e);
            Alert.alert("Email/Password is wrong!");
        });

        if(result)
        {
            const user = result.user;
        }
    }

    async function signUp(): Promise<void>{
        if(passwordCheck != password)
        {
            Alert.alert("Password doesn't match check.")
            return;
        }

        const result = await FirebaseUtil.signUp(email, password).catch((e) =>{
            console.log(e);
            Alert.alert("Something went wrong!");
        });
        if(result)
        {
            console.log(result.user);
            const user = result.user;
            const usersCollection = firestore().collection('users');
            usersCollection.add({
                'uid': user.uid,
                'username': user.displayName,
                'email': email,
                'profile-picture': user.photoURL,
                'admin': false,
                'chat-acces': false,
            });
        }
    }

    return <View style={styles.container}>
        {create ? <Text style={styles.title}>Sign up!</Text> : <Text style={styles.title}>Welcome back!</Text>}

        <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.textInput} />
        <TextInput placeholder="Password" onChangeText={setPassword} value={password} style={styles.textInput} secureTextEntry={true} />
        {create ?
        <>
        <TextInput placeholder="Password check" onChangeText={setPasswordCheck} value={passwordCheck} style={styles.textInput} secureTextEntry={true} />
            <Button title="Sign up" onPress={() => signUp()}></Button>
            <Text style={styles.text} onPress={() => setCreate(false)}>Sign in</Text>
        </> : 
        <>
            <Button title="Sign in" onPress={() => signIn()}></Button>
            <Text style={styles.text} onPress={() => setCreate(true)}>Create an Account</Text>
        </>}
    </View>;
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    text: {
        color: 'blue',
        marginTop: 20,
    },
    title:{
        color: '#b1000d',
        fontWeight: 'bold',
        marginBottom: 5,
    }
})