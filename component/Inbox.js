import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

function BookPet({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [petType, setPetType] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const handleBooking = () => {
    if (!name || !email || !phone || !petType || !bookingDate) {
      Alert.alert("Validation Error", "All fields are required. Please fill out all fields.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(bookingDate)) {
      Alert.alert("Invalid Date", "Please enter a valid date in the format YYYY-MM-DD.");
      return;
    }

    navigation.navigate("Thank", {
      name,
      email,
      phone,
      petType,
      bookingDate,
    });
  };

  return (
    <View style={styles.bookcontainer}>
      <Text style={styles.title}>Book a Pet Service</Text>

      <Text style={styles.label}>Your Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#cfd8dc"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#cfd8dc"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        placeholderTextColor="#cfd8dc"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Pet Type:</Text>
      <TextInput
        style={styles.input}
        value={petType}
        onChangeText={setPetType}
        placeholder="Enter pet type (e.g., Dog, Cat)"
        placeholderTextColor="#cfd8dc"
      />

      <Text style={styles.label}>Booking Date:</Text>
      <TextInput
        style={styles.input}
        value={bookingDate}
        onChangeText={setBookingDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#cfd8dc"
        
      />

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "White", // Lavender-like background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "orange", // Rich purple for the title
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: "600",
    alignSelf: "flex-start",
    color: "black", // Deep purple for labels
  },
  input: {
    borderWidth: 1,
    borderColor: "orange", // Light purple border
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    width: "100%",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: "orange", // Vibrant purple for the button
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
 
});

export default BookPet;
