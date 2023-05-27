import { View } from 'react-native'
import React, { useState } from 'react'
import WorkoutExerciseBox from '../exercise/WorkoutExerciseBox'
import PickExerciseModal from './PickExerciseModal'

const AddEmptyWorkoutForm = ({workout, setWorkout}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingIdx, setEditingIdx] = useState(null);

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

    function selectExerciseHandler(exerciseId) {
        setWorkout({
            ...workout,
            exercises: workout.exercises.map((item, j) => j === editingIdx ? exerciseId : item)
        });
        setModalOpen(false);
    }

    return (
        <View>
            <PickExerciseModal open={modalOpen} setOpen={setModalOpen} selectExerciseHandler={selectExerciseHandler} />
            {[...Array(workout.exercises.length).keys()].map(idx => {
                return (
                    <WorkoutExerciseBox 
                        key={idx}
                        index={idx}
                        exerciseid={workout.exercises[idx]} 
                        setExerciseid={() => {setEditingIdx(idx); setModalOpen(true);}}
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
        </View>
    )
}

export default AddEmptyWorkoutForm