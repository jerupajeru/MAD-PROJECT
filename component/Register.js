import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.text}>Regsiter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'Column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background
  },
  text:
  {
fontSize:'200%',
color:'Black',
fontWeight:'bold'
  },
  inputContainer: {
    
    backgroundColor: '#F9B85D', // Orange background for form section
    width: '20%',
    height:"60%",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height:"20%",
    backgroundColor: 'white', // White input fields
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop:'10%',

  },

  button: {
    backgroundColor: 'blue', // Dark blue/green button
    paddingVertical: 12,
    borderRadius: 5,
    marginLeft:'15%',
    alignItems: 'center',
    marginTop: 10,
    width: '100%', // Set the button's width to 100% of its parent container
  },
  buttonContainer: {
    width: '80%', // Adjust this to control the overall width of the container holding the buttons
  },
  buttonText: {
    color: 'white', // White button text
    fontWeight: 'bold',
    fontSize: 16,
  },
  
 
});


export default RegisterScreen;
