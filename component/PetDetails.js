import { View, Text, Image, StyleSheet, Dimensions, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarkFav from './MarkFav';


export default function PetDetails({ route , navigation, }) {
    const { name, breed, imageUrl, age, sex, user, about } = route.params || {};
    const [readMore, setReadMore] = useState(true); // Initialize readMore state

    return (
        <View style={styles.container}>
            <ScrollView>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{name || 'Unknown Name'}</Text>
            <MarkFav pet={route.params} color='black' marginLeft={20}/>


            <View style={{
                 display: 'flex',
                 flexDirection: 'row',
                 alignItems: 'center',
                 backgroundColor: '#fff1c9',
                 justifyContent:'center',
                 padding: 10,
                 margin: 5,
                 marginLeft: '20%',
                 borderRadius: 15,
                 width: '60%',
                 
                 
            }}>

                <Text style={{
                     fontSize: 18,
                     marginLeft: 10,
                    
                }}>Pet Owner: {user || 'Unknown User'}</Text>

            </View>

            <View style={styles.infoRow}>
                <Image
                    source={require('./../assets/images/calendar.png')}
                    style={styles.icon}
                />
                <Text style={{
                    fontSize: 18,
                    marginRight: 250,
                   
                }}>Age: {age || 'Unknown Age'}</Text>
            </View>

            <View style={styles.infoRow}>
                <Image
                    source={require('./../assets/images/bone.png')}
                    style={styles.icon}
                />
                <Text style={{
                      fontSize: 18,
                      flex:1,
                     flexDirection: 'row',

                }}>Breed: {breed || 'Unknown Breed'}</Text>
            </View>

            <View style={styles.infoRow}>
                <Image
                    source={require('./../assets/images/sex.png')}
                    style={styles.icon}
                />
                <Text style={styles.info}>Sex: {sex || 'Unknown Sex'}</Text>
            </View>

            {/* About Section */}
            <View style={styles.aboutContainer}>
                <Text style={styles.aboutText}>About: {name || 'Unknown Name'}</Text>
                <Text
                    numberOfLines={readMore ? 2 : undefined} // Show 2 lines if readMore is true, else show all
                    style={styles.aboutDescription}
                >
                    {about || 'Unknown About'}
                </Text>
                <Pressable onPress={() => setReadMore(!readMore)}>
                    <Text style={styles.readMoreText}>
                        {readMore ? 'Read More' : 'Show Less'}
                    </Text>
                </Pressable>
            </View>
            
            <View style={styles.bottomContaier}>
                <TouchableOpacity style={styles.adoptBtn}   onPress={() => navigation.navigate('Inbox')} >
                <Text style={{
                    textAlign: "center",
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                    fontWeight:'bold',
                }}>Adopt me</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20
    },
    image: {
        width: Dimensions.get('screen').width * 0.9,
        height: 200,
        marginLeft:10,
        borderRadius: 10,
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
      marginRight: 200,
      flex:1,
     flexDirection: 'row',
    },
    icon: {
        width: 40,
        height: 40,
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff1c9',
        justifyContent:'space-between',
        padding: 10,
        margin: 5,
        borderRadius: 15,
        width: '90%',
        marginRight: 10,
        marginLeft: 10,
    },
    
    aboutContainer: {
        width: '90%', // Align to container width
        marginTop: 10,
        marginLeft: 10,
        margin: 5,
        
        marginRight: 10,
        backgroundColor: '#fff1c9',
        borderRadius: 15,
    },
   
    aboutText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left', 
        paddingLeft: 10
       
    },
    aboutDescription: {
        fontFamily: 'outfit-medium',
        fontSize: 14,
        marginTop: 5,
        paddingLeft: 10
    },
    readMoreText: {
        fontFamily: 'outfit-medium',
        fontSize: 14,
        color: '#4faaff',
        marginTop: 5,
        paddingLeft: 10
    },
    adoptBtn:{
        padding:15,
        backgroundColor: '#E8B20E',
        paddingLeft: 10,
        width: '60%',
        marginLeft: 60,
        marginTop: 10,
        

    },
    bottomContaier:{
        position:'fixed',
        width: '100%',
        bottom:0,
        borderRadius: 15,

    }
});