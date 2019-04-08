// @flow
import React from "react";
import { Button, Text } from "react-native-paper";
import Icon from "@expo/vector-icons/FontAwesome";

export default function GoogleButton(props) {
  function renderIcon({ size, color }) {
    return <Icon size={size} color={color} name="google" />;
  }

  function onPress() {}

  return (
    <Button
      {...props}
      icon={renderIcon}
      color="#d62d20"
      mode="contained"
      onPress={onPress}
    >
      <Text>Entrar com o Google</Text>
    </Button>
  );
}
