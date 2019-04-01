import { createStackNavigator } from 'react-navigation';
import { TicketsScreen, NewTicketScreen, CodeReaderScreen } from '../screens';

export default createStackNavigator({
  Tickets: TicketsScreen,
  NewTicket: NewTicketScreen,
  CodeReader: CodeReaderScreen,
}, {
  initialRouteName: 'Tickets',
});
