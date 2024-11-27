import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import PetListItem from './PetListItem';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Use getDocs
import { db } from '../firebaseAuth';

export default function PetListByCategory() {
    const [petList, setPetList] = useState([]);

    useEffect(() => {
        GetPetList('Dogs'); // Initial fetch for category "Dogs"
    }, []);

    const GetPetList = async (category) => {
        try {
            setPetList([]); // Clear the list before fetching new data
            const q = query(collection(db, 'Pets'), where('category', '==', category));
            const querySnapshot = await getDocs(q); // Use getDocs
            const pets = querySnapshot.docs.map((doc) => doc.data()); // Map docs to data
            setPetList(pets); // Update the state in a single call
        } catch (error) {
            console.log("Error fetching pets: ", error);
        }
    };

    return (
        <View>
            <Category Category={(value) => GetPetList(value)} /> {/* Passing the callback */}
            <FlatList
                data={petList}
                style={{ marginTop: 10 }}
                horizontal={true}
                renderItem={({ item }) => <PetListItem pet={item} />} // Pass pet as a prop
                keyExtractor={(item, index) => index.toString()} // Ensure a unique key
            />
        </View>
    );
}
