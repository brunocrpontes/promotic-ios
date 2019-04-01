import React from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Snackbar
} from "react-native-paper";
import { createIconSetFromFontello } from "@expo/vector-icons";
import brandFontConfig from "../../assets/fonts/config.json";
import { SignInForm } from "../forms";
import { NavigationScreenProp } from "react-navigation";
import {
  GoogleButton,
  FacebookButton,
  ErrorNotifications,
  ErrorNotification
} from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createErrorSelector } from "../reducers/error";
import { Prefix as ConnectionPrefix } from "../reducers/connection";
import { Prefix as UserPrefix } from "../reducers/user";
import { createLoadingSelector } from "../reducers/loading.js";
import { connect } from "react-redux";

const Icon = createIconSetFromFontello(brandFontConfig, "Brand");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    margin: 16
  },
  logo: {
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  centeredButton: {
    alignSelf: "center",
    marginVertical: 2
  },
  optionsDividerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8
  },
  optionsDivider: {
    height: 1,
    flex: 1,
    backgroundColor: "grey"
  },
  optionsDividerText: {
    color: "grey",
    marginHorizontal: 8
  }
});

function SignInScreen(props) {
  const { isLoading, userError, connectionError, hasInternet } = props;

  const disabled = isLoading && !hasInternet;

  function onForgotPasswordPress() {
    const { navigation } = props;

    navigation.navigate("ForgotPassword");
  }

  function onSignUpPress() {
    const { navigation } = props;

    navigation.navigate("SignUp");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <StatusBar animated barStyle="dark-content" />
        <View style={styles.logo}>
          <Icon size={100} color="#f23c44" name="logo_promotic_titulo_coluna" />
        </View>
        <SignInForm />
        <View>
          {/* <Button
            onPress={onForgotPasswordPress}
            style={styles.centeredButton}
            mode="text"
            compact
          >
            <Text>Esqueceu a senha?</Text>
          </Button> */}
          <View style={styles.optionsDividerContainer}>
            <View style={styles.optionsDivider} />
            <Text style={styles.optionsDividerText}>OU</Text>
            <View style={styles.optionsDivider} />
          </View>
          <FacebookButton disabled={disabled} style={styles.centeredButton} />
          <GoogleButton disabled={disabled} style={styles.centeredButton} />
        </View>
      </KeyboardAwareScrollView>
      {Boolean(userError) && (
        <ErrorNotification
          message={userError}
          prefixError={UserPrefix.USER_LOGIN}
        />
      )}
      {Boolean(connectionError) && (
        <ErrorNotification
          message={connectionErrorSelector}
          prefixError={ConnectionPrefix.CONNECTION_STATE}
        />
      )}
    </SafeAreaView>
  );
}

const userErrorSelector = createErrorSelector([UserPrefix.USER_LOGIN]);

const connectionErrorSelector = createErrorSelector([
  ConnectionPrefix.CONNECTION_STATE
]);

const loadingSelector = createLoadingSelector([UserPrefix.USER_LOGIN]);

const mapStateToProps = state => ({
  isLoading: loadingSelector(state),
  userError: userErrorSelector(state),
  connectionError: connectionErrorSelector(state),
  hasInternet: state.connection
});

export default connect(mapStateToProps)(SignInScreen);
