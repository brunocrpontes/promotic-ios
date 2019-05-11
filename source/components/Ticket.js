import React from "react";
import { Card, Title, Text } from "react-native-paper";

export default function Ticket({ numero, nome_fantasia }) {

  return (
    <Card>
      <Card.Content>
        <Title>{numero}</Title>
        <Text>{nome_fantasia}</Text>
      </Card.Content>
    </Card>
  );
}

