import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { auth } from "../firebase";

const SignOut = () => {
  const signOut = () => auth.signOut();

  return (
    <View>
      <Button onPress={signOut} title="Sign out" type="clear" />
    </View>
  );
};

export default SignOut;
