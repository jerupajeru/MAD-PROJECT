import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function petDetails() {
    const pet=useLocalSearchParams();
    const navigation=useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })

    },[])
    return(
        <View>
            <Text>pet detailed page</Text>
        </View>
    )
}
