import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function ForgotPasswordScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar animated barStyle="light-content" />
      <Text>{ForgotPasswordScreen.name}</Text>
    </View>
  );
}
