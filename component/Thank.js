import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ConfirmationScreen({ route }) {
  const { name, email, phone, petType, bookingDate, instructions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank You for Your Booking!</Text>
      <Text style={styles.message}>
        Dear {name}, your booking for a {petType} on {bookingDate} has been confirmed.
      </Text>
      <Text style={styles.message}>
        We will contact you soon at {email} or {phone}.
      </Text>
      {instructions ? (
        <Text style={styles.message}>Special Instructions: {instructions}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop:"0%",
    width: "100%",
    height:"100%",
    alignSelf: "center",
    backgroundColor: "orange",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "White",
     marginTop:"70%",
  },
  message: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
    
  },
});

export default ConfirmationScreen;
