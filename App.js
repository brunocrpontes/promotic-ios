// @flow
import React from "react";
import { store, persistor } from "./source/store";
import theme from "./source/theme";
import Routes from "./source/routes";
import { Provider } from "react-redux";
import { StatusBar, AppRegistry, NetInfo } from "react-native";
import { useScreens } from "react-native-screens";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationService from "./source/routes/NavigationService";
import { updateConnectionState } from "./source/actions/connection";
import { PersistGate } from "redux-persist/integration/react";

useScreens(false);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onInternetStateChange = this.onInternetStateChange.bind(this, store);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.onInternetStateChange
    );
  }

  onInternetStateChange({ dispatch }, isConnected) {
    store.dispatch(updateConnectionState(isConnected));
  }

  componentWillUnmount() {
    NetInfo.removeEventListener("connectionChange");
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
