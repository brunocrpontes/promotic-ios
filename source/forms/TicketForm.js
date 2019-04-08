import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Animated,
  Easing,
  ActivityIndicator
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { FAB, Text } from "react-native-paper";
import theme from "../theme";
import { createLoadingSelector } from "../reducers/loading";
import { Prefix as TicketsPrefix } from "../reducers/tickets";
import { connect } from "react-redux";
import { useTicket } from "../actions/ticket";
import NavigationService from "../routes/NavigationService";
import { createErrorSelector } from "../reducers/error";

const alertTitle = "Falta pouco";
const alertText =
  "Ainda faltam informações no seu cadastro, conclua-o para que você possa participar dos sorteios";
const alertButton = [
  {
    text: "Concluir Cadastro",
    onPress: () => NavigationService.navigate("Profile")
  }
];

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
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.7,
    shadowColor: "#333"
  },
  textInput: {
    fontSize: 16,
    fontFamily: "Roboto",
    flex: 1,
    marginHorizontal: 8,
    minHeight: 34
  },
  fabContainer: {
    position: "absolute",
    right: 8
  },
  fab: {
    backgroundColor: theme.colors.primary
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  loadingText: {
    color: "white",
    fontFamily: "Roboto Medium",
    marginRight: 8
  }
});

class TicketForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      canUseCamera: false,
      animated: new Animated.Value(0)
    };

    this.onBarCodeScanned = this.onBarCodeScanned.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeCodeText = this.onChangeCodeText.bind(this);
    this.onScreenFocus = this.onScreenFocus.bind(this);
  }

  async componentDidMount() {
    const { navigation } = this.props;

    this.didBlur = navigation.addListener("didFocus", this.onScreenFocus);

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ canUseCamera: status === "granted" });
  }

  onScreenFocus() {
    const { user } = this.props;

    if (!user.cpf)
      Alert.alert(alertTitle, alertText, alertButton, { cancelable: false });
  }

  static getDerivedStateFromProps(props, state) {
    const { isLoading } = props;
    if (isLoading) return { ...state, code: "" };

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading, ticketError } = this.props;
    const { animated, code } = this.state;

    if (prevProps.isLoading !== isLoading)
      Animated.timing(animated, {
        toValue: Number(isLoading),
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in
      }).start();

    if (
      prevProps.isLoading !== isLoading &&
      prevState.code === code &&
      !isLoading &&
      !ticketError
    )
      NavigationService.navigate("NewTicketSuccess");
  }

  componentWillUmount() {
    this.didFocus.remove();
  }

  onBarCodeScanned({ type, data }) {
    const { isLoading } = this.props;
    if (isLoading) return;

    this.setState({ code: data }, this.onSubmitForm);
  }

  onChangeCodeText(code) {
    this.setState({ code });
  }

  onSubmitForm() {
    const { code } = this.state;
    const { user, useTicket } = this.props;

    if (!code) return;

    useTicket(user.id, code);
  }

  autoPlay(animatedIcon) {
    this.animatedIcon = animatedIcon;
    if (animatedIcon) {
      this.animatedIcon.play();
    }
  }

  render() {
    const { code, canUseCamera, animated } = this.state;
    const { isLoading } = this.props;

    const fabTranslateInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [-28, 0]
    });

    const fabScaleInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.4]
    });

    const loadingInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [56, 0]
    });

    const animatedFabStyle = {
      transform: [
        { translateY: fabTranslateInterpolation },
        { scale: fabScaleInterpolation }
      ]
    };

    const animatedLoadingStyle = {
      transform: [{ translateY: loadingInterpolation }]
    };

    return (
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          {canUseCamera ? (
            <BarCodeScanner
              onBarCodeScanned={this.onBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.withoutPermission]} />
          )}
          <View style={styles.scannerContainer}>
            <View style={styles.line} />
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            value={code}
            placeholder="Código"
            style={styles.textInput}
            placeholderTextColor="grey"
            onChangeText={this.onChangeCodeText}
            disabled={isLoading}
            onSubmitEditing={this.onSubmitForm}
          />
          <Animated.View style={[styles.fabContainer, animatedFabStyle]}>
            <FAB
              icon="send"
              style={styles.fab}
              disabled={isLoading}
              onPress={this.onSubmitForm}
            />
          </Animated.View>
          <Animated.View
            style={[styles.loadingContainer, animatedLoadingStyle]}
          >
            <Text style={styles.loadingText}>Enviando</Text>
            <ActivityIndicator size="small" color="white" />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const loadingState = createLoadingSelector([TicketsPrefix.USE_TICKET]);
const ticketErrorState = createErrorSelector([TicketsPrefix.USE_TICKET]);

const mapStateToProps = state => ({
  user: state.user,
  isLoading: loadingState(state),
  ticketError: ticketErrorState(state)
});

const mapDispatchToProps = {
  useTicket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketForm);
