import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import firebase, { auth } from '../firebase';

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  return (
    <View>
      <Text style={styles.title}>Welcome to Chatroom!</Text>
      <Button onPress={signInWithGoogle} title="Sign in with Google" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#673ab7',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
});

export default SignIn;
