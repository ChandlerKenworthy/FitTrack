import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WorkoutExerciseBox from '../exercise/WorkoutExerciseBox'
import LoginButton from '../ui/Login/LoginButton'

const AddEmptyWorkoutForm = ({workout, setWorkout}) => {
    function updateRepsHandler(exerciseid, reps) {

    }

    function updateWeightsHandler(exerciseid, weights) {

    }

    return (
        <View style={{marginHorizontal: 15}}>
            {Array(workout.exercises.length).map(idx => {
                return (
                    <WorkoutExerciseBox 
                        exerciseid={3} 
                        reps={[12, 11, 6]} 
                        weights={[145, 160, 180]}
                        updateReps={updateRepsHandler}
                        updateWeights={updateWeightsHandler}
                    />
                );
            })}
            <View style={styles.addExerciseBtnContainer}>
                <LoginButton text={"Add Exercise"} onPress={() => { console.log("TODO: Add next exercise") }} iconName={"pluscircleo"} />
            </View>
        </View>
    )
}

export default AddEmptyWorkoutForm

const styles = StyleSheet.create({
    addExerciseBtnContainer: {
        marginTop: 15
    }
})