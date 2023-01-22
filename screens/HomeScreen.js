import { Button, StyleSheet, Text, View } from 'react-native'
import { useUserAuth } from '../UserAuthContext';

const HomeScreen = () => {
  const { user, logOut } = useUserAuth();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Text>{JSON.stringify(user.email)}</Text>
      <Button onPress={() => logOut()} title="logout" />
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({});