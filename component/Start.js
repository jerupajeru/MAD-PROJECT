// Start.js
import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from '../style/styles'; // Import the styles from the styles.js file

export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Display the image */}
      <Image 
        source={require('./../assets/images/start.jpg')} // Ensure image path is correct
        style={styles.image} // Apply styles from the styles.js file
      />

      {/* Heading and description */}
      <Text style={styles.heading}>Ready to make a new friend?</Text>
      <Text style={styles.description}>Let's adopt the pet which you like and make their life happy</Text>

      {/* Button wrapped in a View to control its width */}
      <View style={styles.buttonContainer}>  
        <Button 
          onPress={() => navigation.navigate('Login')} // Navigate to the 'Main' screen which has tabs
          title="Started"
        />
      </View>
    </View>
  );
}
