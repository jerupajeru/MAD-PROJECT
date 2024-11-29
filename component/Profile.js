import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebaseAuth'; // Ensure this is the correct path
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './Header'; // Import your Header component
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons from react-native-vector-icons

const Profile = () => {
  const [user, setUser] = useState(null); // State to store the logged-in user
  const navigation = useNavigation(); // Get the navigation prop

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user when login/logout occurs
    });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          alert('Logged out successfully!');
          setUser(null); // Clear the user state upon successful logout
        })
        .catch((error) => {
          console.error('Logout error:', error);
          alert('Logout failed. Please try again.');
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with profile icon */}
      <View style={styles.Header}>
        <Header />
      </View>

      {/* Display the user's email */}
      <Text style={styles.email}>{user ? user.email : 'No user logged in'}</Text>


      {/* Favourite Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Favourite')}
      >
        <Icon name="favorite" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.logoutText}>Favourite</Text>
      </TouchableOpacity>

      {/* Inbox Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Inbox')}
      >
        <Icon name="inbox" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.logoutText}>Booking</Text>
      </TouchableOpacity>

{/*MY post */}
<TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('MyPost')}
      >
        <Icon name="person-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.logoutText}>MyPost</Text>
      </TouchableOpacity>
      
      {/* Logout Button */}
      {user && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.logoutText}>Logout</Text>
         
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Header: {
    marginLeft: '25%',
    marginTop: '-20%',
  },
  email: {
    marginTop: '20%',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutButton: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 20,
    width: '90%',
    justifyContent: 'center', // Center items
    marginTop: 30,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 8, // Add some space between the icon and text
  },
  icon: {
    marginRight: 8, // Optional spacing for better alignment
  },
});

export default Profile;