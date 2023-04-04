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

    function addSetHandler(index) {
        let newReps = workout.reps.map((item, idx) => {
            if(idx == index) {
                return [...item, null];
            } else {
                return item;
            }
        });
        let newWeights = workout.weights.map((item, idx) => {
            if(idx == index) {
                return [...item, null];
            } else {
                return item;
            }
        });
        setWorkout({
            ...workout,
            reps: newReps,
            weights: newWeights
        });
    }

    function onDeleteExerciseHandler(index) {
        setWorkout({
            ...workout,
            exercises: workout.exercises.filter((item, idx) => idx !== index),
            reps: workout.reps.filter((item, idx) => idx !== index),
            weights: workout.weights.filter((item, idx) => idx !== index)
        });
    }

    return (
        <View style={{marginHorizontal: 15}}>
            {[...Array(workout.exercises.length).keys()].map(idx => {
                return (
                    <WorkoutExerciseBox 
                        key={idx}
                        index={idx}
                        exerciseid={workout.exercises[idx]} 
                        reps={workout.reps[idx]} // e.g. [3, 6, 6] default is [null] workout.reps[idx-1]
                        weights={workout.weights[idx]} // workout.weights[idx-1]
                        updateReps={updateRepsHandler}
                        updateWeights={updateWeightsHandler}
                        addSet={addSetHandler}
                        onDeleteExercise={onDeleteExerciseHandler}
                    />
                );
            })}
            <LoginButton text={"Add Exercise"} onPress={addExercise} iconName={"pluscircleo"} />
        </View>
    )
}

export default AddEmptyWorkoutForm