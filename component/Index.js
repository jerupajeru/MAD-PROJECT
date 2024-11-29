import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebaseAuth'; // Import db from firebaseAuth.js
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods directly from 'firebase/firestore'

function Index() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    category: '',
    email: '',
    id: '',
    sex: '',
    user: '',
    about: '',
    petImage: null,
  });

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        petImage: result.assets[0].uri,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Get reference to the 'pets' collection in Firestore
      const petCollection = collection(db, 'Pets');
      
      // Add document to the 'pets' collection
      const docRef = await addDoc(petCollection, {
        name: formData.name,
        age: formData.age,
        breed: formData.breed,
        category: formData.category,
        email: formData.email,
        id: formData.id,
        sex: formData.sex,
        user: formData.user,
        about: formData.about,
        petImage: formData.petImage || 'default-image-url',
        imageUrl: formData.petImage || 'default-image-url',
      });
      
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.header}>Add New Pet for Adoption</Text>
      
      {/* Clickable Image Placeholder */}
     {/* Clickable Image Placeholder */}
<TouchableOpacity onPress={pickImage} style={styles.imagePickerPlaceholderContainer}>
  {formData.petImage ? (
    // Show the picked image
    <Image source={{ uri: formData.petImage }} style={styles.petImage} />
  ) : (
    // Show text prompt when no image is picked
    <Text style={styles.imagePickerText}>Pick an Image</Text>
  )}
</TouchableOpacity>


    
      {/* Pet Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Enter pet name"
        />
      </View>

      {/* Age */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(value) => handleInputChange('age', value)}
          placeholder="Enter pet age"
          keyboardType="numeric"
        />
      </View>

      {/* Breed */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          value={formData.breed}
          onChangeText={(value) => handleInputChange('breed', value)}
          placeholder="Enter pet breed"
        />
      </View>

      {/* Category */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>
        <TextInput
          style={styles.input}
          value={formData.category}
          onChangeText={(value) => handleInputChange('category', value)}
          placeholder="Enter pet category"
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Enter your email"
        />
      </View>

      {/* ID */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID *</Text>
        <TextInput
          style={styles.input}
          value={formData.id}
          onChangeText={(value) => handleInputChange('id', value)}
          placeholder="Enter pet ID"
        />
      </View>

      {/* Sex */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sex *</Text>
        <TextInput
          style={styles.input}
          value={formData.sex}
          onChangeText={(value) => handleInputChange('sex', value)}
          placeholder="Enter pet sex"
        />
      </View>

      {/* User */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>User *</Text>
        <TextInput
          style={styles.input}
          value={formData.user}
          onChangeText={(value) => handleInputChange('user', value)}
          placeholder="Enter your username"
        />
      </View>

      {/* About */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={[styles.input, { height: 100 }]} // Adjust height for "About"
          value={formData.about}
          onChangeText={(value) => handleInputChange('about', value)}
          placeholder="Describe the pet"
          multiline={true}
          numberOfLines={5}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    marginBottom: 20,
  
    fontWeight:"bold",
    
  },
  inputContainer: {
    marginVertical: 10,
    padding: 10,
    marginTop:-30,
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit',
   
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontFamily: 'outfit',
    backgroundColor: '#fff',
  },
  imagePickerPlaceholder: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
    marginTop:-20,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
   
  },
  button: {
    padding: 15,
    backgroundColor: '#E8B20E',
    borderRadius: 7,
    marginVertical: 10,
    marginTop:'-5%',
    
  },
  buttonText: {
    fontFamily: 'outfit-medium',
    textAlign: 'center',
   
  },
  imagePickerPlaceholderContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  
  imagePickerText: {
    textAlign: 'center',
    color: '#999',
    fontFamily: 'outfit',
    fontSize: 14,
  },
  
});

export default Index;
