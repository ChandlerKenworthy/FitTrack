import { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import AddExerciseForm from '../components/exercise/AddExerciseForm'
import CircleIconButton from '../components/ui/CircleIconButton';
import { colors } from '../constants/Globalstyles';
import { EmptyExercise } from '../state/EmptyState';
import { exerciseDB } from '../database/localDB';
import { ValidateExercise } from '../util/ValidateExercise';
import { useIsFocused } from '@react-navigation/native';
import PopupInfo from '../components/PopupInfo';
import { SettingsContext } from '../store/settings-context';

const AddExerciseScreen = () => {
  const [exercise, setExercise] = useState(EmptyExercise);
  const [submitError, setSubmitError] = useState();
  const [submitSuccess, setSubmitSuccess] = useState();
  const isFocused = useIsFocused();
  const settingsCtx = useContext(SettingsContext);

  useEffect(() => { // When page is navigated to clear all prior state
    setExercise(EmptyExercise);
    setSubmitError();
    setSubmitSuccess();
  }, [isFocused]);

  function addExerciseHandler() {
    const result = ValidateExercise(exercise.name, exercise.muscleGroupID, exercise.scoreTypeID);
    if(result.length > 0) {
      setSubmitError(result);
      return;
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
                setSubmitSuccess(exercise.name);
                setSubmitError();
                setExercise((prevEx) => {
                  return {
                    ...prevEx,
                    name: ""
                  };
                });
              },
              (txObj2, error2) => { console.log(error2); setSubmitError(error2); }
            );
          }
        },
        (txObj, error) => { console.log(error); setSubmitError(error); }
      );
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {submitError && <PopupInfo setDismissed={() => setSubmitError()} highlightColor={colors.failure}>Error adding exercise</PopupInfo>}
      {submitSuccess && <PopupInfo setDismissed={() => setSubmitSuccess()} highlightColor={colors.success}>Exercise saved successfully</PopupInfo>}
      <AddExerciseForm exercise={exercise} setExercise={setExercise} />
      <View style={styles.submitContainer}>
        <CircleIconButton 
          icon={"check"} 
          onPress={addExerciseHandler} 
          size={40} 
          color={colors.lightorange}
          bgColor={settingsCtx.darkMode ? colors.extralightblack : colors.white}
          scale={0.8} 
        />
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