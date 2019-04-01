import { createStackNavigator } from 'react-navigation';
import TicketsNavigator from './TicketsNavigator';
import { InfoScreen } from '../screens';

export default createStackNavigator({
  Tickets: TicketsNavigator,
  Info: InfoScreen,
}, {
  initialRouteName: 'Tickets',
  mode: 'modal',
});
