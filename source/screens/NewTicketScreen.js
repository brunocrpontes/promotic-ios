import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { TicketForm } from "../forms";
import { Prefix as ConnectionPrefix } from "../reducers/connection";
import { Prefix as TicketPrefix } from "../reducers/tickets";
import { connect } from "react-redux";
import { createErrorSelector } from "../reducers/error";
import { ErrorNotification } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function NewTicketScreen(props) {
  const { connectionError, ticketError, navigation } = props;

  return (
    <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
      <TicketForm navigation={navigation} />
      {Boolean(ticketError) && (
        <ErrorNotification
          message={ticketError}
          prefixError={TicketPrefix.USE_TICKET}
        />
      )}
      {Boolean(connectionError) && (
        <ErrorNotification
          message={connectionError}
          prefixError={ConnectionPrefix.CONNECTION_STATE}
        />
      )}
    </KeyboardAvoidingView>
  );
}

connectionErrorState = createErrorSelector([ConnectionPrefix.CONNECTION_STATE]);
ticketErrorState = createErrorSelector([TicketPrefix.USE_TICKET]);

const mapStateToProps = state => ({
  connectionError: connectionErrorState(state),
  ticketError: ticketErrorState(state)
});

export default connect(mapStateToProps)(NewTicketScreen);
