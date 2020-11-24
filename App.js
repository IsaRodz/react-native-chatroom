import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#212121" />
        <Text style={{ marginTop: 16 }}>Loading...</Text>
      </View>
    );

  return <View style={styles.container}>{user ? <Chat /> : <SignIn />}</View>;
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
