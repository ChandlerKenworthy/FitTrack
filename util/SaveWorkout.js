import { workoutDB } from "../database/localDB";

export function SaveWorkout(workout) {
    const date = workout.date.toISOString().split('T')[0];
    const exercises = JSON.stringify(workout.exercises);
    const reps = JSON.stringify(workout.reps);
    const weights = JSON.stringify(workout.weights);

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