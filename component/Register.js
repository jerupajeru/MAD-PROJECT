import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import { auth } from '../firebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterScreen = ({ navigation }) => {
  // Handle sign-up
  const handleSignUp = async (values) => {
    const { email, password } = values;
    try {
      // Create user with email and password
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Registered with:', user);

      // After successful registration, navigate to the login screen
      navigation.navigate("Login");  // Ensure the screen name matches exactly (case-sensitive)
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/register.jpg')} // Your image path
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.text}>Register</Text>
        
        {/* Formik form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.input}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    marginLeft: "0%",
    marginBottom:"0%",
    marginTop: "1%",
    resizeMode: 'cover', // Ensures the image scales to cover the entire screen
    justifyContent: 'center', // Centers content vertically
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginTop: "2%",
    marginRight: "0%",
    color: 'brown',
    fontWeight: 'bold',
  },
  inputContainer: {
    // Orange background for form section
    width: '80%', // Adjusted to be 80% of the screen width
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect
    marginRight: "0%",
    marginBottom: "20%",
  },
  input: {
    height: 50,
    backgroundColor: 'white', // White input fields
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'brown', // Dark blue/green button
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%', // Set the button's width to 100% of its parent container
  },
  buttonContainer: {
    marginLeft: '6%',
    width: '80%', // Adjust this to control the overall width of the container holding the buttons
  },
  buttonText: {
    color: 'white', // White button text
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red', // Red text for errors
    fontSize: 12,
    marginBottom: 10,
  },
});

export default RegisterScreen;
