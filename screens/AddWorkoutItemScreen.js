import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { EmptyWorkout } from '../state/EmptyState';
import { colors } from '../constants/Globalstyles';
import { MaterialIcons } from '@expo/vector-icons';
import { CleanWorkout, SaveWorkout } from '../util/SaveWorkout';
import { workoutDB } from '../database/localDB';
import { SettingsContext } from '../store/settings-context';
import AddEmptyWorkoutForm from '../components/form/AddEmptyWorkoutForm';
import BasicTextInput from '../components/form/BasicTextInput';
import LoginButton from '../components/ui/Login/LoginButton';

const AddWorkoutItemScreen = ({navigation}) => {
  const [workout, setWorkout] = useState(null);
  const settingsCtx = useContext(SettingsContext);
  const [isFromTemplate, setIsFromTemplate] = useState(null);

  useEffect(() => {
    workoutDB.transaction(tx => {
        tx.executeSql(
            "SELECT COUNT(*) FROM workouts",
            null,
            (tx, result) => {
                setWorkout({
                  ...EmptyWorkout,
                  name: `Workout ${Object.values(result.rows._array[0])[0]+1}`
                })
            },
            (tx, error) => console.warn(`[Error in AddWorkoutItemScreen.js] ${error}`)
        );
    });
  }, [isFromTemplate]);

  function submitWorkoutHandler() {
    let workoutCopy = workout;
    workoutCopy = CleanWorkout(workoutCopy, settingsCtx.metricUnits);
    SaveWorkout(workoutCopy);
    setIsFromTemplate(null); // Trigger page to reset
    navigation.navigate('Home'); // Navigate back to home screen
  }

  function updateNameHandler(text) {
    setWorkout({
      ...workout,
      name: text
    });
  }

  if(isFromTemplate === null) {
    return (
      <View style={styles.root}>
        <TouchableOpacity 
          style={styles.optionBtn} 
          onPress={() => console.log('go to select template...')}
        >
          <Text style={styles.btnText}>New workout from template</Text>
        </TouchableOpacity>
        <Text style={styles.spacerText}>or</Text>
        <TouchableOpacity 
          style={styles.optionBtn} 
          onPress={() => setIsFromTemplate(false)}
        >
          <Text style={styles.btnText}>New empty workout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if(isFromTemplate !== null) { 
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
         <View style={styles.titleContainer}>
          <BasicTextInput 
            value={workout.name}
            onChangeText={updateNameHandler}
            placeholder={"Workout Name"}
            showBorder={false}
            style={{fontSize: 24, fontWeight: '700'}}
          />
            <Pressable onPress={() => {
              setIsFromTemplate(null);
              setWorkout(EmptyWorkout);
            }}>
              <MaterialIcons name="delete-forever" size={30} color={colors.failure} />
            </Pressable>
         </View>
         <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{`${workout.date.getDate()}/${workout.date.getMonth()+1}/${workout.date.getFullYear()}`}</Text>
         </View>
        </View>
        <AddEmptyWorkoutForm workout={workout} setWorkout={setWorkout} />
        <View style={styles.submitBtnWrapper}>
          <LoginButton text={"Submit"} onPress={submitWorkoutHandler} iconName={"checkcircleo"} />
        </View>
      </ScrollView>
    );
  }
}

export default AddWorkoutItemScreen

const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },

  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  optionBtn: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 35
  },

  spacerText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '300',
    color: colors.gray
  },

  btnText: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.charcoal
  },

  headerContainer: {
    marginHorizontal: 15,
    marginTop: 15,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  dateContainer: {
    marginTop: 5,
    marginBottom: 15,
  },

  dateText: {
    color: colors.gray,
    fontSize: 16,
  },

  titleText: {
    fontSize: 28,
    fontWeight: '700',
    marginRight: 20
  },

  submitBtnWrapper: {
    marginHorizontal: 15,
    marginTop: 20,
  }
})