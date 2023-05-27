import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/Globalstyles';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { workoutDB } from '../database/localDB';
import WorkoutListItem from '../components/workout/WorkoutListItem';
import RippleButton from '../components/ui/Buttons/RippleButton';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
  const [workouts, setWorkouts] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const isFocused = useIsFocused();

  async function fetchWorkouts() {
    await workoutDB.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM workouts WHERE year = (?) ORDER BY month DESC, day DESC",
        [new Date().getFullYear()], // TODO: have filters to search through
        (tx, result) => setWorkouts(result.rows._array),
        (tx, error) => console.warn(error)
      );
    });
  }

  useEffect(() => {
    fetchWorkouts()
  }, [isFocused]);

  function onRefreshHandler() {
    setIsFetching(true);
    fetchWorkouts();
    setIsFetching(false);
  }

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
            refreshing={isFetching}
            onRefresh={onRefreshHandler}
          />
        )}
        <View style={styles.ctaBtnContainer}>
          <RippleButton
            style={styles.rippleBtn}
            onTap={() => navigation.navigate("Calendar")}
          >
            <AntDesign name={"calendar"} style={styles.icon} size={55} color={colors.lightorange} />
          </RippleButton>
          <RippleButton
            style={styles.rippleBtn}
            onTap={() => navigation.navigate('AddWorkoutStack', { screen: 'AddWorkoutItem' })}
          >
            <AntDesign name={"plus"} style={styles.icon} size={55} color={colors.lightorange} />
          </RippleButton>
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

  workoutsList: {
    width: '100%',
    marginTop: 15,
  },

  buffer: {
    marginVertical: 6
  },

  ctaBtnContainer: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.0)'
  },

  rippleBtn: {
    borderRadius: '50%',
    backgroundColor: colors.white,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: {x: 0, y: 0},
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    padding: 15,
  }
});