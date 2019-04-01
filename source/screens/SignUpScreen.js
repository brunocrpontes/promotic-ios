import React from "react";
import { SignUpForm } from "../forms";
import { connect } from "react-redux";
import { createErrorSelector } from "../reducers/error";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Prefix as ConnectionPrefix } from "../reducers/connection";
import { Prefix as UserPrefix } from "../reducers/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ErrorNotification } from "../components";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
  }
});

function SignUpScreen(props) {
  const { connectionError, userError } = props;

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        scrollEnabled
        contentContainerStyle={styles.container}
      >
        <StatusBar animated barStyle="light-content" />
        <SignUpForm />
      </KeyboardAwareScrollView>
      {Boolean(userError) && (
        <ErrorNotification
          message={userError}
          prefixError={UserPrefix.USER_SIGNUP}
        />
      )}
      {Boolean(connectionError) && (
        <ErrorNotification
          message={connectionError}
          prefixError={ConnectionPrefix.CONNECTION_STATE}
        />
      )}
    </React.Fragment>
  );
}

const connectionErrorState = createErrorSelector(
  ConnectionPrefix.CONNECTION_STATE
);
const userErrorState = createErrorSelector([UserPrefix.USER_SIGNUP]);

const mapStateToProps = state => ({
  connectionError: connectionErrorState(state),
  userError: userErrorState(state)
});

export default connect(mapStateToProps)(SignUpScreen);
