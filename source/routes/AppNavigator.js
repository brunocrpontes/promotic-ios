import { TicketsScreen, LiveStreamScreen } from "../screens";
import { createStackNavigator } from "react-navigation";
import HomeNavigator from "./HomeNavigator";
import NewTicketNavigator from "./NewTicketNavigator";
import theme from "../theme";

export default createStackNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        header: null
      }
    },
    NewTicketStack: {
      screen: NewTicketNavigator,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: "white"
      }
    },
    Tickets: {
      screen: TicketsScreen,
      navigationOptions: {
        title: "Meus Tickets",
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerTintColor: "white"
      }
    },
    Live: {
      screen: LiveStreamScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    headerBackTitleVisible: false,
    initialRouteName: "Home"
  }
);
