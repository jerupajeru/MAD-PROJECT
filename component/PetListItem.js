import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PetListItem({ pet }) {
    const navigation = useNavigation();

    const handlePress = () => {
        console.log('Navigating to PetDetails with params:', pet);
        // Navigate to PetDetails with parameters
        navigation.navigate('PetDetails', { ...pet });
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
                {pet?.name || 'Unknown Name'}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#8F8E8D', fontFamily: 'outfit' }}>
                    {pet?.breed || 'Unknown Breed'}
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
