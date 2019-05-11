import React from "react";
import { Notifications } from 'expo'
import theme from "./source/theme";
import Routes from "./source/routes";
import { Provider } from "react-redux";
import { store, persistor } from "./source/store";
import { StatusBar, NetInfo } from "react-native";
import { useScreens } from "react-native-screens";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationService from "./source/routes/NavigationService";
import { updateConnectionState } from "./source/actions/connection";

useScreens(false);

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.onInternetStateChange = this.onInternetStateChange.bind(this, store);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.onInternetStateChange
    );

    this.notificationListener = Notifications.addListener(this.onNotificationReceived)
  }

  componentWillUnmount() {
    NetInfo.removeEventListener("connectionChange");
  }

  onNotificationReceived = (notification) => {
    console.log(notification)
  }

  onInternetStateChange({ dispatch }, isConnected) {
    dispatch(updateConnectionState(isConnected));
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <StatusBar animated barStyle="light-content" />
            <Routes
              ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}
            />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}
