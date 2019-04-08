import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { DangerZone } from "expo";

const { Lottie } = DangerZone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: "#fff"
  },
  lottieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  lottie: {
    width: 120,
    height: 120,
    alignSelf: "center"
  },
  text: {
    fontSize: 18,
    fontFamily: "Roboto Medium"
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  }
});

export default function NewTicketSuccessScreen(props) {
  function addNewTicket() {
    const { navigation } = props;

    navigation.goBack();
  }

  function finish() {
    const { navigation } = props;

    navigation.dismiss();
  }

  function playAnimation(ref) {
    if (ref) ref.play();
  }

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <View style={styles.lottie}>
          <Lottie
            ref={ref => playAnimation(ref)}
            source={require("../../assets/lottie/success.json")}
            loop={false}
            style={styles.lottie}
          />
        </View>
        <Text style={styles.text}>Ticket adicionado com sucesso!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button compact mode="text" onPress={addNewTicket}>
          <Text>Novo Ticket</Text>
        </Button>
        <Button mode="contained" onPress={finish}>
          <Text>Concluir</Text>
        </Button>
      </View>
    </View>
  );
}
