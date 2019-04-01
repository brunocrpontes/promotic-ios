import { createStackNavigator } from "react-navigation";
import HomeNavigator from "./HomeNavigator";
import PromotionNavigator from "./PromotionNavigator";
import theme from "../theme";
import { NewTicketScreen } from "../screens";

export default createStackNavigator(
  {
    Main: {
      screen: HomeNavigator,
      navigationOptions: ({ navigation }) => {
        const name = navigation.getParam("name", "");
        const [firstName] = name.split(" ");

        return {
          title: `Olá, ${firstName || name}`
        };
      }
    },
    NewTicket: {
      screen: NewTicketScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: "white"
    },
    mode: "modal",
  }
);
