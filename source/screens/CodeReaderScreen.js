import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function CodeReaderScreen(props) {
  return (
    <View style={styles.container}>
      <Text>{CodeReaderScreen.name}</Text>
    </View>
  );
}
