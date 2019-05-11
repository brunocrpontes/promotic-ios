// @flow
import React from "react";
import { AppLoading, Asset } from "expo";
import { Image } from "react-native";
import { loadAsync } from "expo-font";
import { connect } from "react-redux";

// fonts
import RobotoThin from "../../assets/fonts/Roboto-Thin.ttf";
import RobotoLight from "../../assets/fonts/Roboto-Light.ttf";
import Roboto from "../../assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "../../assets/fonts/Roboto-Medium.ttf";
import Brand from "../../assets/fonts/brand.ttf";

// Images and Assets
import promotionLogo from "../../assets/images/promocao_banner.png";
import liveBackground from '../../assets/images/video-background.jpg';
import offlineLiveBanner from '../../assets/images/promotic-live-offline.png';

function LoadingScreen(props) {
  function loadAssets(images) {
    return images.map(image => {
      if (typeof image === "string") return Image.prefetch(image);

      return Asset.fromModule(image).downloadAsync();
    });
  }

  function loadFonts() {
    return loadAsync({
      Brand,
      "Roboto Thin": RobotoThin,
      "Roboto Light": RobotoLight,
      Roboto,
      "Roboto Medium": RobotoMedium
    });
  }

  function onFinish() {
    const { user, navigation } = props;

    user.isAuthenticated && user.id
      ? navigation.navigate("Promotions", { name: user.nome })
      : navigation.navigate("SignIn");
  }

  function onStartAsync() {
    return Promise.all([loadFonts(), ...loadAssets([promotionLogo, liveBackground, offlineLiveBanner])]);
  }

  return <AppLoading onFinish={onFinish} startAsync={onStartAsync} />;
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(LoadingScreen);
