import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { LoadingScreen } from "../screens";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

const Root = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Auth: AuthNavigator,
    App: AppNavigator
  },
  { initialRouteName: "Loading" }
);

export default createAppContainer(Root);
