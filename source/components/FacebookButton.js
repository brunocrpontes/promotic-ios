// @flow
import React from "react";
import { Button, Text } from "react-native-paper";
import Icon from "@expo/vector-icons/FontAwesome";
import { connect } from "react-redux";
import { facebookLogin } from "../actions/user";

function FacebookButton(props) {
  const { facebookLogin } = props;

  function renderIcon({ size, color }) {
    return <Icon size={size} color={color} name="facebook-official" />;
  }

  return (
    <Button
      {...props}
      color="#3b5998"
      icon={renderIcon}
      mode="contained"
      onPress={facebookLogin}
    >
      <Text>Entrar com o Facebook</Text>
    </Button>
  );
}

const mapDispatchToProps = {
  facebookLogin
};

export default connect(
  null,
  mapDispatchToProps
)(FacebookButton);
