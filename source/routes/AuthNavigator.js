import { createStackNavigator } from "react-navigation";
import { SignInScreen, SignUpScreen, ForgotPasswordScreen } from "../screens";
import theme from "../theme";

const SignInAndUp = createStackNavigator(
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

export default createStackNavigator(
  {
    Sign: {
      screen: SignInAndUp,
      navigationOptions: {
        header: null
      }
    },
    ForgotPassword: ForgotPasswordScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: "white"
    },
    mode: "modal"
  }
);
