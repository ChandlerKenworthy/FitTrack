import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import AddExerciseForm from '../components/exercise/AddExerciseForm'
import CircleIconButton from '../components/ui/CircleIconButton';
import { colors } from '../constants/Globalstyles';
import { EmptyExercise } from '../state/EmptyState';
import { exerciseDB } from '../database/localDB';
import { muscleGroupIDtoString, scoreTypeIDtoString } from '../assets/DummyData';
import { useIsFocused } from '@react-navigation/native';

const AddExerciseScreen = () => {
  const [exercise, setExercise] = useState(EmptyExercise);
  const [submitError, setSubmitError] = useState();
  const [submitSuccess, setSubmitSuccess] = useState();
  const isFocused = useIsFocused();

  useEffect(() => { // When page is navigated to clear all prior state
    setExercise(EmptyExercise);
    setSubmitError();
    setSubmitSuccess();
  }, [isFocused]);

  function addExerciseHandler() {
    if(!Object.keys(muscleGroupIDtoString).map(i => parseInt(i)).includes(exercise.muscleGroupID)) {
      setSubmitError("Invalid muscle group selected (somehow)!");
      return 1;
    }
    if(!Object.keys(scoreTypeIDtoString).map(i => parseInt(i)).includes(exercise.scoreTypeID)) {
      setSubmitError("Invalid score type selected (somehow)!");
      return 1;
    }
    if(exercise.name.length < 3) {
      setSubmitError("Exercise names must be at least 3 characters long");
      return 1;
    }
    
    exerciseDB.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) FROM exercises WHERE UPPER(name) = (?)', 
        [exercise.name.toUpperCase()],
        (txObj, resultSet) => { 
          const numMatches = Object.values(resultSet.rows._array[0])[0];
          const exAlreadyExists = numMatches == 0 ? false : true;
          if(exAlreadyExists) {
            setSubmitError("An exercise with that name already exists!");
          } else {
            tx.executeSql(
              'INSERT INTO exercises (name, muscleGroup_id, scoreType_id) VALUES (?, ?, ?)',
              [exercise.name, exercise.muscleGroupID, exercise.scoreTypeID],
              (txObj2, resultSet2) => {
                setSubmitSuccess(true);
                setSubmitError();
                setExercise((prevEx) => {
                  return {
                    ...prevEx,
                    name: ""
                  };
                });
              },
              (txObj2, error2) => { setSubmitError(error2); }
            );
          }
        },
        (txObj, error) => { setSubmitError(error); }
      );
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {submitError && <Text>Submit result: {submitError}</Text>}
      {submitSuccess && <Text>Exercise saved successfully!</Text>}
      <AddExerciseForm exercise={exercise} setExercise={setExercise} />
      <View style={styles.submitContainer}>
        <CircleIconButton icon={"check"} onPress={addExerciseHandler} size={40} color={colors.lightorange} scale={0.8} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  submitContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30
  }
});

export default AddExerciseScreen;