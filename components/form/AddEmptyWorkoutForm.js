import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WorkoutExerciseBox from '../exercise/WorkoutExerciseBox'

const AddEmptyWorkoutForm = ({workout, setWorkout}) => {
    function updateRepsHandler(exerciseid, reps) {

    }

    function updateWeightsHandler(exerciseid, weights) {

    }

    // workoutexbox shows the currently inputted data and can allow modifications?
    return (
        <View style={{marginHorizontal: 15}}>
        <WorkoutExerciseBox 
            exerciseid={4} 
            reps={[12, 11, 6]} 
            weights={[145, 160, 180]}
            updateReps={updateRepsHandler}
            updateWeights={updateWeightsHandler}
        />
        <Text>Button to add the next exercise...</Text>
        </View>
    )
}

export default AddEmptyWorkoutForm

const styles = StyleSheet.create({})