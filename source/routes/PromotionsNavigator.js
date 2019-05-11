import theme from "../theme";
import { PromotionsScreen, RegulationScreen } from "../screens";
import { createStackNavigator } from "react-navigation";

export default createStackNavigator(
  {
    Promotions: {
      screen: PromotionsScreen,
      navigationOptions: ({ navigation }) => {
        const name = navigation.getParam("name", "");
        const [firstName] = name.split(" ");

        return {
          title: `Promotic - Olá, ${firstName || name}`
        };
      }
    },
    Regulation: {
      screen: RegulationScreen,
      navigationOptions: {
        title: 'Regulamento'
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
    headerBackTitleVisible: false,
    mode: 'modal'
  }
);
