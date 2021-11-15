import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppStack from './AppStack';
import LoginProvider from './utils/LoginProvider';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginProvider>
        <AppStack />
      </LoginProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111119',
  }
})
