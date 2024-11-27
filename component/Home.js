import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Slider from './Slider'; // Correct path
import PetListByCategory from './PetListByCategory';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


function Home() {
  return (
    <TouchableOpacity style={styles.container}>
      <Slider />
      <PetListByCategory/>
      <View style={styles.addNewPetContainer}>
      <MaterialIcons name="pets" size={24} color="#E8B20E" />
        <Text style={{
          fontFamily:'outfit-medium',
          color:'#E8B20E',
          fontSize:18
        }}>Add new pet</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        padding:20,
        backgroundColor:'#fff1c9',
        borderWidth:2,
        borderColor:'#E8B20E',
        borderRadius:15,
        borderStyle:'dashed',
        justifyContent:'center',
        marginTop:10
  },
});

export default Home;
