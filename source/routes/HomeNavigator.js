import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import theme from "../theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProfileNavigator from "./ProfileNavigator";
import PromotionsNavigator from "./PromotionsNavigator";

export default createBottomTabNavigator(
  {
    PromotionsTab: {
      screen: PromotionsNavigator,
      navigationOptions: {
        title: "Promoção",
        tabBarIcon: ({ focused, tintColor }) => (
          <MaterialIcons color={tintColor} name={"receipt"} size={24} />
        )
      }
    },
    ProfileTab: {
      screen: ProfileNavigator,
      navigationOptions: {
        title: "Perfil",
        tabBarIcon: ({ focused, tintColor }) => (
          <MaterialIcons color={tintColor} name={"person"} size={24} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      tabStyle: {
        backgroundColor: theme.colors.primary
      },
      activeTintColor: "white",
      inactiveTintColor: "#00000070"
    }
  }
);
