import { createStackNavigator } from "react-navigation";
import { SignInScreen, SignUpScreen } from "../screens";
import theme from "../theme";

export default createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        title: "Cadastro"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTitleStyle: {
        fontFamily: "Roboto Medium"
      },
      headerTintColor: "white"
    },
    headerBackTitleVisible: false
  }
);
