import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { AppLoading } from 'expo';

export default ({ children }) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Text {...props} style={styles.text}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
  },
});
