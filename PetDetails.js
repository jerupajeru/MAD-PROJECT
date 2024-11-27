import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useSearchParams } from 'expo-router';

export default function PetDetails() {
    const params = useSearchParams(); // Retrieve query parameters
    const { name, breed, age, imageUrl } = params; // Extract properties

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name || "Unknown Name"}</Text>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
            />
            <Text style={styles.info}>Breed: {breed || "Unknown Breed"}</Text>
            <Text style={styles.info}>Age: {age || "N/A"} YRS</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
});
