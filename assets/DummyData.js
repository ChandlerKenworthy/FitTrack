export const exerciseList = [
    {
        name: "Flat Barbell Bench Press",
        muscleGroupID: 2,
        scoreTypeID: 0
    },

    {
        name: "Incline Bench Press",
        muscleGroupID: 2,
        scoreTypeID: 0
    },

    {
        name: "Deadlift",
        muscleGroupID: 1,
        scoreTypeID: 0
    },

    {
        name: "Romanian Deadlift (RDL)",
        muscleGroupID: 1,
        scoreTypeID: 0
    },

    {
        name: "Preacher Curl",
        muscleGroupID: 3,
        scoreTypeID: 0
    }
];

export const scoreTypeIDtoString = {
    0: "Weights & Reps",
    1: "Time",
    2: "Distance"
};

export const muscleGroupIDtoString = {
    0: "Legs",
    1: "Back",
    2: "Chest",
    3: "Biceps",
    4: "Triceps",
    5: "Shoulders"
};