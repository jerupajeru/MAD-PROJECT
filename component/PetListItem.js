import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function PetListItem({ pet }) {
    const router = useRouter();

    const handlePress = () => {
        console.log('Navigating to PetDetails with params:', pet);
        router.push({
            pathname: 'component/PetDetails', // Ensure the path matches your folder structure
            params: { ...pet }, // Pass the pet object as query parameters
        });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{
                padding: 10,
                marginRight: 15,
                backgroundColor: '#fff',
                borderRadius: 10,
            }}
        >
            <Image
                source={{ uri: pet?.imageUrl }}
                style={{
                    width: 150,
                    height: 135,
                    resizeMode: 'cover',
                    borderRadius: 10,
                }}
            />
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 }}>
                {pet?.name || "Unknown Name"}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#8F8E8D', fontFamily: 'outfit' }}>
                    {pet?.breed || "Unknown Breed"}
                </Text>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        color: '#E8B20E',
                        paddingHorizontal: 7,
                        borderRadius: 10,
                        fontSize: 11,
                        backgroundColor: '#fff1c9',
                    }}
                >
                    {pet?.age || 'N/A'} YRS
                </Text>
            </View>
        </TouchableOpacity>
    );
}
