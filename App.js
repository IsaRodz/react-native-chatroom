import React from "react";
import { StyleSheet, Button, View, StatusBar } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

export default function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <View style={styles.container}>
      {user ? <Chat /> : <SignIn />}
      <StatusBar backgroundColor="#ddd" barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#673ab7",
    color: "#fff",
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
});
