import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

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
          onPress={() => navigation.navigate('Login')} // Navigate to the 'Login' screen
          title="Get Started"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    marginTop: "10%",  // Adjusts the position of the heading text
    fontSize: 24,  // Optional: Customize the size of the heading
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,  // Adds space between description and button
  },
  image: {
    marginTop: "-10%",  // Adjusts the position of the image
    width: '100%',  // Image width takes up the full container width
    height: '60%',  // Image height is set to fill the container height
    resizeMode: 'contain',  // Ensures image maintains aspect ratio
  },
  buttonContainer: {
    width: '100%',  // Makes button container take full width
    backgroundColor: 'yellow',
    marginTop: 20,  // Adds space between the image/description and the button
  },
});
