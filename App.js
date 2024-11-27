import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './component/Start';  // Import Start from components
import Login from './component/login';  // Import Login
import Home from './component/Home';  // Import Home
import Register from './component/Register';  // Import Register
import Tabs from './component/Tabs';  // Import Tabs
import Profile from './component/Profile';
import Favourite from './component/Favourite';
import Inbox from './component/Inbox';
import PetDetails from './component/PetDetails'


// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        {/* Authentication Stack Screens */}
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Favourite" component={Favourite} />
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="PetDetails" component={PetDetails} />
        {/* Navigate to Tabs after successful login */}
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
