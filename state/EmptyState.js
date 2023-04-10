export const EmptyExercise = {
    name: "",
    muscleGroupID: 0,
    scoreTypeID: 0,
};

export const EmptyWorkout = {
    name: "Workout 1", // TODO: Should get number of workouts and add 1 
    date: new Date(), // default's to today
    exercises: [], // array of id's
    // sets can be drawn from reps i.e. n(sets) exercise n is reps[n].length
    reps: [], // arr of arr (n reps in each set) len(reps) = len(ex). 
    weights: [], // weight of each set len(weights) = len(ex). Sub-array's match reps
};

export const EmptyWorkoutTemplate = {
    exercises: [], // Array of exercises by exercise_id
    sets: [], // how many sets each exercise should be peformed for
    reps: [], // how many reps to perform in each set (arr of arr)
};

export const EmptySettings = {
    darkMode: false, // Is the app in dark-mode UI
    guiScale: 1.0, // increase/decrease scale of buttons and text default = 1.0
    useMetricUnits: true,
};