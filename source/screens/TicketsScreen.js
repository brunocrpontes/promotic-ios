import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import theme from "../theme";
import { Button, Text, Card, Divider, Title } from "react-native-paper";
import { Prefix as TicketsPrefix } from "../reducers/tickets";
import { requestTicketList } from "../actions/ticket";
import { Prefix as ConnectionPrefix } from "../reducers/connection";
import { createErrorSelector } from "../reducers/error";
import { createLoadingSelector } from "../reducers/loading";
import { connect } from "react-redux";
import { ErrorNotification, Ticket } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 16
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    margin: 16
  },
  textEmpty: {
    textAlign: "center",
    color: "grey"
  }
});

class TicketsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.renderTicket = this.renderTicket.bind(this);
  }

  componentDidMount() {
    const { requestTicketList } = this.props;

    requestTicketList();
  }

  renderTicket({ item }) {
    return <Ticket numero={item.numero} />;
  }

  render() {
    const {
      tickets,
      connectionError,
      requestTicketList,
      requestTicketsError,
      isLoading
    } = this.props;

    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
      );
    }

    if (requestTicketsError || connectionError) {
      return (
        <View style={styles.container}>
          <Button onPress={requestTicketList} icon="refresh" mode="text">
            <Text>Tentar Novamente</Text>
          </Button>
          {Boolean(requestTicketsError) && (
            <ErrorNotification
              message={requestTicketsError}
              prefixError={TicketsPrefix.LIST_TICKETS}
            />
          )}
          {Boolean(connectionError) && (
            <ErrorNotification
              message={connectionError}
              prefixError={ConnectionPrefix.CONNECTION_STATE}
            />
          )}
        </View>
      );
    }

    if (tickets.length === 0) {
      return (
        <View style={styles.loading}>
          <Title style={styles.textEmpty}>
            Você ainda não tem nenhum ticket cadastrado nessa promoção
          </Title>
        </View>
      );
    }

    return (
      <FlatList
        data={tickets}
        keyExtractor={item => `${item.id}`}
        renderItem={this.renderTicket}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  }
}

const loadingListTicketsState = createLoadingSelector([
  TicketsPrefix.LIST_TICKETS
]);

const connectionErrorState = createErrorSelector([
  ConnectionPrefix.CONNECTION_STATE
]);

const errorListTicketsState = createErrorSelector([TicketsPrefix.LIST_TICKETS]);

const mapStateToProps = state => ({
  tickets: state.tickets,
  connectionError: connectionErrorState(state),
  requestTicketsError: errorListTicketsState(state),
  isLoading: loadingListTicketsState(state)
});

const mapDispatchToProps = {
  requestTicketList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsScreen);
