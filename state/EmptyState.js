export const EmptyExercise = {
    name: "",
    muscleGroupID: 0,
    scoreTypeID: 0,
};

export const EmptyWorkout = {
    date: new Date(), // default's to today
    exercises: {
        // should have key: value pair as exercise_id: [[reps, reps, reps], [weight, weight, weight]]
    },
};