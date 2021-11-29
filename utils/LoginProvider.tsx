import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useEffect } from 'react';

import auth from '@react-native-firebase/auth'

import firestore from '@react-native-firebase/firestore';

import SingleStateProvider from './SingleStateProvider';

interface Props {
    children: React.ReactNode;
}

export default function LoginProvider(props: Props) {
    const StateProvider = SingleStateProvider.getInstance();

    const onAuthStateChanged = (auth_user: FirebaseAuthTypes.User | null) => {
        StateProvider.storeKeyValue('isLoading', false);
        auth_user != null ? getUserByID(auth_user) : StateProvider.storeKeyValue('user', null);
    }

    async function getUserByID(user: FirebaseAuthTypes.User | null) {
        const query = await firestore().collection('users').where('uid', '==', user?.uid).get();
        if (!query.empty) {
            const snapshot = query.docs[0];
            const data = snapshot.data();

            const UserData = {
                admin: data.admin,
                chatAcces: data.chatAcces,
                email: data.email,
                profilePicture: data.profilePicture,
                uid: data.uid,
                username: data.username
            }
            StateProvider.storeKeyValue('user', UserData);
        }
    }

    useEffect(() => {
        const sub = auth().onAuthStateChanged(onAuthStateChanged);
        return sub;
    }, []);

    return (
        <>
            {props.children}
        </>
    );
}
