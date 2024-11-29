import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseAuth';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const ProfileIcon = () => {
  const [user, setUser] = useState(null);

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
      alert('Logged out successfully');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      alert('Logout failed');
      });
  };

  // Get user's initials (first letter of name or email)
  const getInitials = (user) => {
    if (user) {
      const name = user.displayName || user.email || 'User';
      const nameArray = name.split(' ');
      return nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
    }
    return 'U'; // Default to 'U' if no user or name exists
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when login/logout occurs
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <TouchableOpacity
      style={styles.profileIcon}
      onPress={() => Alert.alert('Options', 'Logout or Other Options', [
        { text: 'Logout', onPress: handleLogout },
        { text: 'Cancel', style: 'cancel' }
      ])}
    >
      {/* Display the first letter of the user's email or display name */}
      <Text style={styles.initialsText}>
        {user ? getInitials(user) : 'U'} {/* Show initials or default to 'U' */}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    backgroundColor: '#FCAF03',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  initialsText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft:7,
  },
});

export default ProfileIcon;
