import React from "react";
import theme from "../theme";
import { HomeScreen, ProfileScreen } from "../screens";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "@expo/vector-icons/MaterialIcons";

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Tickets",
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon color={tintColor} name={"receipt"} size={24} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Perfil",
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon color={tintColor} name={"person"} size={24} />
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
