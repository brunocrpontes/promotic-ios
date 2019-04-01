import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: theme.colors.primary
  }
});

export default function HomeScreen(props) {
  function onFabPress() {
    const { navigation } = props;

    navigation.navigate("NewTicket");
  }

  return (
    <View style={styles.container}>
      <Text>{HomeScreen.name}</Text>
      <FAB
        onPress={onFabPress}
        icon={"add"}
        label={"ADC. TICKET"}
        style={styles.fab}
      />
    </View>
  );
}
