import { View, Pressable, Text } from "react-native"; // Added Text
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "../Shared/Shared";
import { getAuth } from "firebase/auth";

export default function MarkFav({ pet, color = "black" }) {
    const [user, setUser] = useState(null);
    const [favList, setFavList] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            setUser(currentUser);
            GetFav(currentUser);
        }
    }, []);

    const GetFav = async (currentUser) => {
        try {
            const result = await Shared.GetFavList(currentUser);
            setFavList(result?.favourites || []); // Ensure a default empty array
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const AddToFav = async () => {
        if (!pet || !user) return; // Check if pet and user are defined
        try {
            const updatedFavList = [...favList, pet.id];
            await Shared.UpdateFav(user, updatedFavList);
            GetFav(user);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    const removeFromFav = async () => {
        if (!pet || !user) return; // Check if pet and user are defined
        try {
            const updatedFavList = favList.filter((item) => item !== pet.id);
            await Shared.UpdateFav(user, updatedFavList);
            GetFav(user);
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    return (
        <View>
            {!pet ? (
                <Text></Text> // Handle undefined pet
            ) : favList?.includes(pet.id) ? (
                <Pressable onPress={removeFromFav}>
                    <Ionicons name="heart" size={30} color="red" marginLeft={20} />
                </Pressable>
            ) : (
                <Pressable onPress={AddToFav}>
                    <Ionicons name="heart-outline" size={30} color={color} marginLeft={20}/>
                </Pressable>
            )}
        </View>
    );
}
