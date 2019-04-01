import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { FAB } from "react-native-paper";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  withoutPermission: {
    backgroundColor: "#333"
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  line: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 32
  },
  textInputContainer: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "#00000070",
    flexDirection: "row",
    alignItems: "center"
  },
  textInput: {
    fontSize: 16,
    fontFamily: "Roboto",
    padding: 8,
    flex: 1,
    color: "white"
  },
  fab: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 8,
    transform: [{ translateY: -26 }]
  }
});

export default class TicketForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      canUseCamera: false
    };

    this.onBarCodeScanned = this.onBarCodeScanned.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeCodeText = this.onChangeCodeText.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ canUseCamera: status === "granted" });
  }

  onBarCodeScanned({ type, data }) {
    console.log(data);
    this.setState({ code: data });
  }

  onChangeCodeText(code) {
    this.setState({ code });
  }

  onSubmitForm() {}

  render() {
    const { code, canUseCamera } = this.state;

    if (!canUseCamera) {
      return <View style={[styles.container, styles.withoutPermission]} />;
    }

    return (
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          <BarCodeScanner
            onBarCodeScanned={this.onBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.scannerContainer}>
            <View style={styles.line} />
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            autoFocus
            value={code}
            placeholder="Código"
            style={styles.textInput}
            placeholderTextColor={"#e5e5e5"}
            onChangeText={this.onChangeCodeText}
          />
          <FAB icon="send" style={styles.fab} />
        </View>
      </View>
    );
  }
}
