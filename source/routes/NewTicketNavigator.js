import { createStackNavigator } from "react-navigation";
import { NewTicketScreen, NewTicketSuccessScreen } from "../screens";

export default createStackNavigator(
  {
    NewTicket: {
      screen: NewTicketScreen,
      navigationOptions: {
        headerTintColor: "white",
        headerTransparent: true
      }
    },
    NewTicketSuccess: {
      screen: NewTicketSuccessScreen,
      navigationOptions: {
        gesturesEnabled: false,
        header: null
      }
    }
  },
  {
    headerBackTitleVisible: false,
    mode: "modal"
  }
);
