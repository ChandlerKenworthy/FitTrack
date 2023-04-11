import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CircleIconButton from '../components/ui/CircleIconButton';
import { colors } from '../constants/Globalstyles';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../store/settings-context';
import { useIsFocused } from '@react-navigation/native';
import { workoutDB } from '../database/localDB';
import WorkoutListItem from '../components/workout/WorkoutListItem';

const HomeScreen = ({navigation}) => {
  const settingsCtx = useContext(SettingsContext);
  const [workouts, setWorkouts] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    workoutDB.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM workouts ORDER BY date(date) DESC",
        null,
        (tx, result) => setWorkouts(result.rows._array),
        (tx, error) => console.warn(error)
      );
    });
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        {(!workouts || workouts.length === 0) && <Text style={styles.noWorkoutText}>Workout log empty</Text>}
        {(workouts && workouts.length > 0) && (
          <FlatList 
            data={workouts}
            renderItem={({item}) =>  <WorkoutListItem workout={item} />}
            keyExtractor={(item) => item.id}
            style={styles.workoutsList}
            ItemSeparatorComponent={() => <View style={styles.buffer}></View>}
          />
        )}
        <View style={styles.addWorkoutBtnContainer}>
          <CircleIconButton 
            onPress={() => navigation.navigate('AddWorkoutStack')} 
            icon="plus" size={46} scale={0.8} 
            color={colors.lightorange} 
            bgColor={settingsCtx.darkMode ? colors.extralightblack : colors.white}
          />
        </View>
        <View style={styles.switchViewBtnContainer}>
          <CircleIconButton 
            onPress={() => navigation.navigate('Calendar')} 
            icon="calendar" size={46} 
            scale={0.8} 
            color={colors.lightorange} 
            bgColor={settingsCtx.darkMode ? colors.extralightblack : colors.white}
          />
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
    color: colors.lightgray
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
  },

  workoutsList: {
    width: '100%',
    marginTop: 15,
  },

  buffer: {
    marginVertical: 10
  },
});