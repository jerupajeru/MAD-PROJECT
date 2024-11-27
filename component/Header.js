import React, { useState, useEffect } from 'react';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to fetch user data from localStorage
    const fetchUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser); // Update state with user data
    };

    // Fetch user data when the component mounts
    fetchUserData();

    // You could also listen for changes to localStorage (if needed)
    const storageListener = () => {
      fetchUserData(); // Re-fetch data if it changes
    };

    window.addEventListener('storage', storageListener);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, []); // Empty array ensures this runs only once on mount

  return (
    <div>
      <h1>Welcome</h1>
      {user ? (
        <p>{`Welcome ${user.fullname}`}</p>
      ) : (
        <p>Please register or log in.</p>
      )}
    </div>
  );
}

export default Header;
