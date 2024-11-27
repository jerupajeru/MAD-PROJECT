import React, { useState, useEffect } from 'react';  // Add the necessary imports
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Slider from './Slider'; // Correct path
import PetListByCategory from './PetListByCategory';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from './Header'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseAuth'; // Ensure correct Firebase import

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Set user to state when logged in
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>

      {/* Display Profile Icon if the user is logged in */}
      {user && <Header user={user} />}

      <Slider />
      <PetListByCategory />

      <View style={styles.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color="#E8B20E" />
        <Text style={styles.addNewPetText}>Add new pet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addNewPetContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff1c9',
    borderWidth: 2,
    borderColor: '#E8B20E',
    borderRadius: 15,
    borderStyle: 'dashed',
    justifyContent: 'center',
    marginTop: 10,
  },
  addNewPetText: {
    fontFamily: 'outfit-medium',
    color: '#E8B20E',
    fontSize: 18,
  },
});

export default Home;
