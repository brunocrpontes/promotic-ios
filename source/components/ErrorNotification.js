import React from "react";
import { Snackbar, Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import theme from "../theme";
import { remove } from "../actions/error";
import { Prefix } from "../reducers/connection";
import { connect } from "react-redux";

function ErrorNotification({ message, remove, prefixError, ...props }) {
  function onDismiss() {
    if (prefixError === Prefix.CONNECTION_STATE) return;

    remove(prefixError);
  }

  const action =
    prefixError === Prefix.CONNECTION_STATE
      ? null
      : {
          label: "Entendido",
          onPress: () => remove(prefixError)
        };

  return (
    <Snackbar
      visible={Boolean(message)}
      action={action}
      duration={Snackbar.DURATION_MEDIUM}
      onDismiss={onDismiss}
    >
      {message || ""}
    </Snackbar>
  );
}

const mapDispatchToProps = {
  remove
};

export default connect(
  null,
  mapDispatchToProps
)(ErrorNotification);
