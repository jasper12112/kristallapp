import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';

import auth from '@react-native-firebase/auth'

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface ContextType {
    user: Object | null;
    isLoading: boolean;
}

export const LoginContext = React.createContext({} as ContextType);

interface Props {
    children: React.ReactNode;
}

export default function LoginProvider(props: Props) {
    const [user, setUser] = useState<Object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onAuthStateChanged = (auth_user: FirebaseAuthTypes.User | null) => {
        setIsLoading(false);
        auth_user != null ? getUserByID(auth_user) : setUser(null);
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
            setUser(UserData)
        }
    }

    useEffect(() => {
        const subscribe = auth().onAuthStateChanged(onAuthStateChanged);
        return subscribe;
    }, []);

    return (
        <LoginContext.Provider value={{ user, isLoading }}>
            {props.children}
        </LoginContext.Provider>
    );
}
