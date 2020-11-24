import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { auth } from "../firebase";

const SignOut = () => {
  const signOut = () => auth.signOut();

  return (
    <View>
      <Button
        onPress={signOut}
        type="clear"
        icon={<Feather name="log-out" size={18} />}
      />
    </View>
  );
};

export default SignOut;
