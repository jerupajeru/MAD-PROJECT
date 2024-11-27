import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseAuth';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill all the fields!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
      console.log('Logged in with:', user.email);

      navigation.navigate("Tabs");
    } catch (error) {
      console.error('Error during login:', error.message);

      if (error.code === 'auth/user-not-found') {
        alert('User not found. Please check your email or sign up.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.text}>LOGIN</Text>
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
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
    backgroundColor: 'white', // White input fields
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop:'5%',

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



export default LoginScreen;
