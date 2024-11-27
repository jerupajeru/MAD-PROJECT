import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseAuth'; // Make sure this path is correct

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Sliders'));
      const sliders = snapshot.docs.map(doc => doc.data()); // Retrieve the data as an array
      setSliderList(sliders); // Set all sliders in one go
    } catch (error) {
      console.log("Error fetching sliders: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}  // Hides the scroll indicator
        keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Ensures the container takes up all available space
    justifyContent: 'flex-start', // Aligns children (the FlatList) to the top
    alignItems: 'center', // Centers the content horizontally
  },
  sliderImage: {
    width: Dimensions.get('screen').width * 0.7, // 90% of screen width
    height: 150,
    borderRadius: 20,
    marginRight: 5,
  },
});
