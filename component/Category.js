import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseAuth'; // Ensure this path is correct
import { collection, getDocs } from 'firebase/firestore'; // Use getDocs for fetching collections

export default function Category({Category}) {
    const [CategoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Dogs'); // Default selected category

    useEffect(() => {
        GetCategories();
    }, []);

    // Fetch the categories from Firestore
    const GetCategories = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'Category'));
            const categories = snapshot.docs.map(doc => doc.data()); // Map docs to data
            setCategoryList(categories); // Set category data to state
        } catch (error) {
            console.log("Error fetching categories: ", error);
        }
    };

    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Category</Text>

            <FlatList
                data={CategoryList}
                numColumns={4} // Display items in 4 columns
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedCategory(item.name);
                            Category(item.name)

                        } }// Set selected category on press
                        style={{ flex: 1 }}
                        key={index} // Add key for each item
                    >
                        <View
                            style={[
                                styles.container,
                                selectedCategory === item.name && styles.selectedCategoryContainer, // Highlight selected category
                            ]}
                        >
                            <Image
                                source={{ uri: item?.imageUrl }}
                                style={styles.categoryImage}
                            />
                        </View>
                        <Text style={{ textAlign: 'center', fontFamily: 'outfit' }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff1c9',
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#E8B20E',
        margin: 5,
    },
    selectedCategoryContainer: {
        borderColor: '#4faaff', // Highlight selected category border
        backgroundColor: '#4faaff', // Highlight selected category background
    },
    categoryImage: {
        width: 40,
        height: 40,
    },
});
