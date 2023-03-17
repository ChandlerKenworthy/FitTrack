export const EmptyExercise = {
    name: "",
    muscleGroupID: 0,
    scoreTypeID: 0,
};

export const EmptyWorkout = {
    date: new Date(), // default's to today
    exercises: [], // array of id's
    sets: [], // how many sets each exercise was performed for
    reps: [], // arr of arr (n reps in each set)
    weights: [], // weight of each set (len(weights) = sum(sets)
};

export const EmptyWorkoutTemplate = {
    exercises: [], // Array of exercises by exercise_id
    sets: [], // how many sets each exercise should be peformed for
    reps: [], // how many reps to perform in each set (arr of arr)
};