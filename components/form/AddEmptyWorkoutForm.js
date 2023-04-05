import { View } from 'react-native'
import React from 'react'
import WorkoutExerciseBox from '../exercise/WorkoutExerciseBox'
import LoginButton from '../ui/Login/LoginButton'

const AddEmptyWorkoutForm = ({workout, setWorkout}) => {
    function updateRepsHandler(exerciseIndex, setIndex, repsText) {
        if(repsText === null || repsText === "" || repsText === undefined || isNaN(parseInt(repsText))) {
            return;
        }
        setWorkout({
            ...workout,
            reps: workout.reps.map((prevReps, i) => {
                if(i === exerciseIndex) {
                    let thisNewReps = prevReps;
                    thisNewReps[setIndex] = parseInt(repsText);
                    return thisNewReps;
                } else {
                    return prevReps;
                }
            })
        });
    }

    function updateWeightsHandler(exerciseIndex, setIndex, weightsText) {
        if(weightsText === null || weightsText === "" || weightsText === undefined || isNaN(parseInt(weightsText))) {
            return;
        }
        setWorkout({
            ...workout,
            weights: workout.weights.map((prevWeights, i) => {
                if(i === exerciseIndex) {
                    let thisNewWeights = prevWeights;
                    thisNewWeights[setIndex] = parseInt(weightsText);
                    return thisNewWeights;
                } else {
                    return prevWeights;
                }
            })
        });
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
                let prevSets = item;
                prevSets = [...prevSets, null];
                return prevSets;
            } else {
                return item;
            }
        });
        let newWeights = workout.weights.map((item, idx) => {
            if(idx == index) {
                let prevWeights = item;
                prevWeights = [...prevWeights, null];
                return prevWeights;
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
    
    function onDeleteSetHandler(exerciseIndex, setIndex) {
        const newReps = workout.reps.map((item, idx) => {
            if(idx === exerciseIndex) {
                return item.filter((i, j) => j !== setIndex);
            } else {
                return item;
            }
        });
        const newWeights = workout.weights.map((item, idx) => {
            if(idx === exerciseIndex) {
                return item.filter((i, j) => j !== setIndex);
            } else {
                return item;
            }
        });

        setWorkout({
            ...workout,
            exercises: newReps[exerciseIndex].length === 0 ? workout.exercises.filter((item, idx) => idx !== exerciseIndex) : workout.exercises,
            reps: newReps,
            weights: newWeights
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
                        onDeleteSet={onDeleteSetHandler}
                    />
                );
            })}
            <LoginButton text={"Add Exercise"} onPress={addExercise} iconName={"pluscircleo"} />
        </View>
    )
}

export default AddEmptyWorkoutForm