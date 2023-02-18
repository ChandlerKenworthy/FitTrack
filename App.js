import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserAuthContextProvider } from './UserAuthContext';
import { useEffect, useState } from 'react';
import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddWorkoutItemScreen from './screens/AddWorkoutItemScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';
import ExerciseListScreen from './screens/ExerciseListScreen';
import { colors } from './constants/Globalstyles';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator screenOptions={{
        drawerActiveTintColor: colors.lightorange,
        drawerActiveBackgroundColor: colors.extralightgray,
        headerTintColor: colors.lightorange
      }}>
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: "Dashboard",
            drawerIcon: ({color}) => <AntDesign name="home" size={24} color={color} />
          }}
        />
        <Drawer.Screen 
          name="AddWorkout" 
          component={AddWorkoutItemScreen} 
          options={{
            title: "Add Workout",
            drawerIcon: ({color}) => <AntDesign name="pluscircleo" size={24} color={color} />
          }}
        />
        <Drawer.Screen 
          name="ViewExercises" 
          component={ExerciseListScreen} 
          options={{
            title: "View Exercises",
            drawerIcon: ({color}) => <AntDesign name="search1" size={24} color={color} />
          }}
        />
        <Drawer.Screen 
          name="AddExercise" 
          component={AddExerciseScreen} 
          options={{
            title: "Add Exercise",
            drawerIcon: ({color}) => <FontAwesome5 name="dumbbell" size={24} color={color} />
          }}
        />
        <Drawer.Screen 
          name="Calendar" 
          component={CalendarScreen} 
          options={{
            drawerIcon: ({color}) => <AntDesign name="calendar" size={24} color={color} />
          }}
        />
        <Drawer.Screen 
          name="Analysis" 
          component={AnalysisScreen} 
          options={{
            drawerIcon: ({color}) => <AntDesign name="linechart" size={24} color={color} />
          }}
        />
        <Drawer.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            drawerIcon: ({color}) => <AntDesign name="user" size={24} color={color} />
          }}
        />
      </Drawer.Navigator>
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