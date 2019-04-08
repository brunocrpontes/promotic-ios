import React from "react";
import theme from "../theme";
import { PromotionsScreen } from "../screens";
import { createStackNavigator } from "react-navigation";

export default createStackNavigator(
  {
    Promotions: {
      screen: PromotionsScreen,
      navigationOptions: ({ navigation }) => {
        const name = navigation.getParam("name", "");
        const [firstName] = name.split(" ");

        return {
          title: `Promotic - Olá, ${firstName || name}`
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: "white"
    },
    headerBackTitleVisible: false
  }
);
