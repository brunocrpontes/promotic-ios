import React from "react";
import { Card, Title } from "react-native-paper";

export default class Ticket extends React.PureComponent {
  render() {
    const { numero } = this.props;

    return (
      <Card>
        <Card.Content>
          <Title>{numero}</Title>
        </Card.Content>
      </Card>
    );
  }
}
