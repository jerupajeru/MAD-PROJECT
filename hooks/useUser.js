import { useState, useEffect } from 'react';
import { auth } from '../firebaseAuth'; // Import firebase.js for authentication
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Authentication method

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to the authentication state change
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when auth state changes
    });

    return () => unsubscribe();  // Cleanup listener on component unmount
  }, []);

  return { user };
};

export { useUser };