import { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import AddExerciseForm from '../components/exercise/AddExerciseForm'
import CircleIconButton from '../components/ui/CircleIconButton';
import { colors } from '../constants/Globalstyles';

const AddExerciseScreen = () => {
  const [exercise, setExercise] = useState({
    name: "",
    category: 0,
    record: 0
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <AddExerciseForm exercise={exercise} setExercise={setExercise} />
      <View style={styles.submitContainer}>
        <CircleIconButton icon={"check"} onPress={()=>{}} size={40} color={colors.lightorange} scale={0.8} />
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