import React from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationEvents } from 'react-navigation'
import { subscribe } from '../actions/notification'
import { Button, Text } from "react-native-paper";
import { connect } from "react-redux";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width,
    height: width,
    alignSelf: 'center'
  },
  image: {
    width,
    height: width,
  },
  buttons: {
    marginTop: 8
  },
  button: {
    margin: 4,
    alignSelf: "center"
  }
});

function PromotionsScreen(props) {

  function onAddTicketPress() {
    const { navigation } = props;

    navigation.navigate("NewTicket");
  }

  function onMyTicketsPress() {
    const { navigation } = props;

    navigation.navigate("Tickets");
  }

  function onRegulationPress() {
    const { navigation } = props;

    navigation.navigate("Regulation");
  }

  function onLivePress() {
    const { navigation } = props;

    navigation.navigate("Live");
  }

  function onScreenDidFocus() {
    const { subscribe } = props;
    subscribe()
  }

  return (
    <ScrollView>
      <NavigationEvents onWillFocus={onScreenDidFocus} />
      <View style={styles.imageContainer}>
        <Image
          width={null}
          height={null}
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/images/promocao_banner.png")}
        />
      </View>
      <View
        style={styles.buttons}
      >
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
        <Button
          mode="contained"
          style={styles.button}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="file-document-box" size={size} color={color} />
          )}
          onPress={onRegulationPress}
        >
          <Text>Regulamento</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="play-circle" size={size} color={color} />
          )}
          onPress={onLivePress}
        >
          <Text>Live</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const mapDispatchToProps = {
  subscribe
}

export default connect(null, mapDispatchToProps)(PromotionsScreen)
