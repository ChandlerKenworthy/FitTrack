import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from '../components/form/DatePicker'
import { EmptyWorkout } from '../state/EmptyState';

const AddWorkoutItemScreen = () => {
  const [workout, setWorkout] = useState(EmptyWorkout);

  function updateDateHandler() {

  }

  return (
    <ScrollView style={{flex: 1}}>
      <Text>User should be able to pick:</Text>
      <Text>- When workout occurred (date picker)</Text>
      <Text>- Exercises performed and for how many sets/weights/reps</Text>
      <Text>- Rest time between sets etc</Text>

      <View style={styles.datePickerContainer}>
        <Text style={styles.inputPromptText}>Date:</Text>
        <DatePicker date={workout.date} setDate={updateDateHandler} allowFuture={false} />
      </View>
    </ScrollView>
  )
}

export default AddWorkoutItemScreen

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center'
  },

  inputPromptText: {
    fontWeight: '700',
    fontSize: 22,
    marginRight: 10
  }
})