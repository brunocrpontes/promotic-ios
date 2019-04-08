import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, Text } from "react-native-paper";
import theme from "../theme";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: null,
    width,
    maxHeight: width,
    alignSelf: "center",
    top: 0
  },
  buttons: {
    marginTop: 8
  },
  button: {
    margin: 4,
    alignSelf: "center"
  }
});

export default function PromotionsScreen(props) {
  function onAddTicketPress() {
    const { navigation } = props;

    navigation.navigate("NewTicket");
  }

  function onMyTicketsPress() {
    const { navigation } = props;

    navigation.navigate("Tickets");
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require("../../assets/images/promocao_banner.png")}
      />
      <View style={styles.buttons}>
        <Button
          mode="contained"
          style={styles.button}
          icon={({ size, color }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={size}
              color={color}
            />
          )}
          onPress={onAddTicketPress}
        >
          <Text>Ler Ticket</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="ticket" size={size} color={color} />
          )}
          onPress={onMyTicketsPress}
        >
          <Text>Meus Tickets</Text>
        </Button>
      </View>
    </View>
  );
}
