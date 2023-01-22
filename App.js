import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserAuthContextProvider } from './UserAuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { useEffect, useState } from 'react';
import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if(newUser) { // User is logged in
        setUser(newUser);
      } else { // Use not logged in, use authStack
        setUser();
      }
    });
  }, [auth]);

  function authStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  function authenticatedStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <UserAuthContextProvider value={user}>
      <NavigationContainer>
        {user ? authenticatedStack() : authStack()}
      </NavigationContainer>
    </UserAuthContextProvider>
  );
}