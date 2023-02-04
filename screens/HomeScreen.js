import { useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CircleIconButton from '../components/ui/CircleIconButton';
import { useUserAuth } from '../UserAuthContext';

const HomeScreen = ({navigation}) => {
  const { user, logOut } = useUserAuth();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <Text style={styles.noWorkoutText}>Workout log empty</Text>
        <View style={styles.addWorkoutBtnContainer}>
          <CircleIconButton onPress={() => console.log("I add workout")} icon="plus" size={46} scale={0.8} color={"#FB8500"} />
        </View>
        <View style={styles.switchViewBtnContainer}>
          <CircleIconButton onPress={() => console.log("switch between list and calender view")} icon="calendar" size={46} scale={0.8} color={"#FB8500"} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noWorkoutText: {
    fontSize: 32,
    fontWeight: '300',
    color: "#ccc"
  },

  addWorkoutBtnContainer: {
    position: "absolute",
    bottom: 20,
    right: 35
  },

  switchViewBtnContainer: {
    position: 'absolute',
    bottom: 20,
    left: 35
  }
});