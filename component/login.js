import React, { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import { auth } from '../firebaseAuth'; // Ensure this is correctly imported
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  // Authentication state check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Login"); // Navigate to Tabs screen if user is logged in
      }
    });
    return unsubscribe;
  }, [navigation]);

  // Handle Login Function
  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
      console.log('Logged in with:', user.email);

      // On successful login, navigate to the Tabs screen
      navigation.navigate("Tabs");
    } catch (error) {
      console.error('Error during login:', error.message);

      // Handle specific Firebase authentication errors
      if (error.code === 'auth/user-not-found') {
        alert('User not found. Please check your email or sign up.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert('Login failed. Register first.');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/login1.jpg')} // Ensure the image path is correct
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.text}>LOGIN</Text>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.inputContainer}>
              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={styles.button}
                >
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
    width: '70%',
    height: '90%',
    position: 'absolute',
    marginLeft: '20%',
    marginTop: '1%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#b8860b',
    fontWeight: 'bold',
    marginRight: "30%",
    marginBottom: "2%",
  },
  inputContainer: {
    width: '40%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginRight: "30%",
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#b8860b',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    color: "black",
  },
  buttonContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
