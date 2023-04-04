import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WorkoutExerciseBox from '../exercise/WorkoutExerciseBox'
import LoginButton from '../ui/Login/LoginButton'

const AddEmptyWorkoutForm = ({workout, setWorkout}) => {
    function updateRepsHandler(exerciseid, reps) {

    }

    function updateWeightsHandler(exerciseid, weights) {

    }

    function addExercise() {
        const newWorkout = {
            ...workout,
            exercises: [...workout.exercises, null], // unknown exercise 
            reps: [...workout.reps, [null]], // don't know how many reps are in the sets yet
            weights: [...workout.weights, [null]], // defautl to previous value from history?
        };
        setWorkout(newWorkout);
    }

    return (
        <View style={{marginHorizontal: 15}}>
            {[...Array(workout.exercises.length).keys()].map(idx => {
                return (
                    <WorkoutExerciseBox 
                        key={idx}
                        exerciseid={workout.exercises[idx]} 
                        reps={workout.reps[idx]} // e.g. [3, 6, 6] default is [null] workout.reps[idx-1]
                        weights={workout.weights[idx]} // workout.weights[idx-1]
                        updateReps={updateRepsHandler}
                        updateWeights={updateWeightsHandler}
                    />
                );
            })}
            <LoginButton text={"Add Exercise"} onPress={addExercise} iconName={"pluscircleo"} />
        </View>
    )
}

export default AddEmptyWorkoutForm

const styles = StyleSheet.create({

})