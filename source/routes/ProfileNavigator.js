import React from "react";
import theme from "../theme";
import { ProfileScreen } from "../screens";
import { createStackNavigator } from "react-navigation";
import { Button } from "react-native";
import { Types as UserTypes } from "../reducers/user";
import { store } from "../store";

export default createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Perfil",
        headerRight: (
          <Button
            onPress={() =>
              store.dispatch({ type: UserTypes.USER_LOGOUT_REQUEST })
            }
            title="Sair"
            color="white"
          />
        )
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: "white"
    }
  }
);
