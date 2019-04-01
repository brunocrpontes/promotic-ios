// @flow
import React from "react";
import { AppLoading } from "expo";
import { loadAsync } from "expo-font";

// fonts
import RobotoThin from "../../assets/fonts/Roboto-Thin.ttf";
import RobotoLight from "../../assets/fonts/Roboto-Light.ttf";
import Roboto from "../../assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "../../assets/fonts/Roboto-Medium.ttf";
import Brand from "../../assets/fonts/brand.ttf";

// Images

export default function LoadingScreen(props) {
  //TODO: load cached data

  function loadFonts(): Promise<void> {
    return loadAsync({
      Brand,
      "Roboto Thin": RobotoThin,
      "Roboto Light": RobotoLight,
      Roboto,
      "Roboto Medium": RobotoMedium
    });
  }

  function onError(error) {
    console.error(error);
  }

  function onFinish() {
    props.navigation.navigate("SignIn");
  }

  function onStartAsync(): Promisse<void> {
    return Promise.all([loadFonts() /* loadImages */]);
  }

  return (
    <AppLoading
      onFinish={onFinish}
      onError={onError}
      startAsync={onStartAsync}
    />
  );
}
