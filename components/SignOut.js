import React from 'react';
import { View, Button } from 'react-native';
import { auth } from '../firebase';

const SignOut = () => {
  const signOut = () => auth.signOut();

  return (
    <View>
      <Button onPress={signOut} title="Sign out" />
    </View>
  );
};

export default SignOut;
