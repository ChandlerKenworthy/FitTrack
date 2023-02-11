import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import AddExerciseForm from '../components/exercise/AddExerciseForm'

const AddExerciseScreen = () => {
  const [exercise, setExercise] = useState({
    name: "",
    category: 0,
    record: 0 // 0 =  weight & reps, 1 = time, 2 = distance
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <AddExerciseForm exercise={exercise} setExercise={setExercise} />
    </SafeAreaView>
  )
}

export default AddExerciseScreen