import React from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="#000" size="large"/>
            <Text>Loading</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111119',
      justifyContent: 'center',
    },
});