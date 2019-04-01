import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { TicketForm } from "../forms";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function NewTicketScreen(props) {
  return (
    <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
      <TicketForm />
    </KeyboardAvoidingView>
  );
}
