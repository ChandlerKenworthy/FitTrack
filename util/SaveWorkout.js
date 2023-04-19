import { Alert } from "react-native";
import { exerciseDB, workoutDB } from "../database/localDB";

export function CleanWorkout(workout) {
    // Cleanup the workout ready for database submission
    // Date validation (can't be in the future)
    const today = new Date();
    if(new Date(workout.date) > today) {
        // TODO: Show appropriate warnings to user to get them to correct the date
        workout.date = today; // For now just set date to today
    }

    // Name validation (no empty names)
    if(workout.name.replaceAll(' ','').length < 1) {
        workout.name = "Unnamed Workout"; // TODO: Make this dynamic?
    }
    
    // TODO: Don't just remove unless everything is blank! Feedback to user?
    // Find all index's that need modification
    let removeTopIdxs = [];
    let removeBottomIdxs = [];
    const newReps = workout.reps.map((repArr, index) => {
        removeBottomIdxs.push([]);
        const newRepsArr = repArr.filter((repCount, repIndex) => {
            if(isNaN(parseInt(repCount)) || isNaN(parseFloat(workout.weights[index][repIndex]))) {
                removeBottomIdxs[index].push(repIndex); // track all reps that are bad
                return false; // so we can remove the corresponding weight item
            }
            return true;
        });
        // Delete entire entry if no valid reps recorded or exercise name doesn't exist
        if(workout.exercises[index] === null || newRepsArr.length === 0) {
            removeTopIdxs.push(index);
        }
        return newRepsArr;
    });
    workout.reps = newReps;

    // Update the weights array based on all indicies we know must be removed
    const newWeights = workout.weights.map((weightArr, index) => {
        const newWeightArr = weightArr.filter((weight, weightIndex) => {
            if(removeBottomIdxs[index].includes(weightIndex)) {
                return false;
            }
            return true;
        });
        if(newWeightArr.length === 0) {
            removeTopIdxs.push(index);
        }
        return newWeightArr;
    });
    workout.weights = newWeights;

    // Filter all the master arrays and dump anything that needs to go
    const newExercises = workout.exercises.filter((el, idx) => {
        if(removeTopIdxs.includes(idx)) {
            return false;
        } return true;
    });

    const newRepsAdj = workout.reps.filter((el, idx) => {
        if(removeTopIdxs.includes(idx)) {
            return false;
        } return true;
    });

    const newWeightsAdj = workout.weights.filter((el, idx) => {
        if(removeTopIdxs.includes(idx)) {
            return false;
        } return true;
    });

    workout.exercises = newExercises;
    workout.reps = newRepsAdj;
    workout.weights = newWeightsAdj;

    // First check it wasn't a misclick/not all empty and all lengths are zero
    if(workout.exercises.length === 0 && workout.reps.length === 0 && workout.weights.length === 0) {
        return null;
    }
    return workout;
}

export function SaveWorkout(workout) {
    if(workout === null || workout === undefined) {
        Alert.alert("Workout Not Saved", "Workout was empty or contained insufficient information");
        return;
    }

    const date = workout.date.toISOString().split('T')[0];
    const exercises = JSON.stringify(workout.exercises);
    const reps = JSON.stringify(workout.reps);
    const weights = JSON.stringify(workout.weights);
    const maxWeights = workout.weights.map((arr) => Math.max(...arr));

    for(let i = 0; i < workout.exercises.length; i++) { // TODO: Must be a better way to do this
        exerciseDB.transaction(tx => {
            tx.executeSql(
                "UPDATE exercises SET personalBest = (?) WHERE id = (?) AND (personalBest < (?) OR personalBest IS NULL)",
                [maxWeights[i], workout.exercises[i], maxWeights[i]],
                (tx, result) => { },
                (tx, error) => console.warn(`[Error - SaveWorkout.js exerciseDB] ${error}`)
            );
        });
    }

    let totalVolume = 0;
    for(let i = 0; i < workout.reps.length; i++) {
        for(let j = 0; j < workout.reps[i].length; j++) {
            totalVolume += (workout.reps[i][j] * workout.weights[i][j]);
        }
    }

    workoutDB.transaction(tx => {
        tx.executeSql(
            "INSERT INTO workouts (name, date, totalVolume, exercises, reps, weights) VALUES (?, ?, ?, ?, ?, ?)",
            [workout.name, date, totalVolume, exercises, reps, weights],
            (tx, resultSet) => console.log("Saved success!"),
            (tx, error) => console.warn(`[Error in SaveWorkout.js] ${error}`)
        );
    });
}