// When a user tries to add a new exercise validate the inputs are
// sensible and that an exercise with the same name does not exist
// already
export async function ValidateExercise(exercise) {
    if(typeof(exercise.category) !== "number") {
        return false;
    }
    if(typeof(exercise.record) !== "number") {
        return false;
    }
    if(exercise.name.length < 3) { // TODO: Somewhat arbitrary currently
        return false;
    }

    // TODO: Make sure exercise being added does not already exist!

    return true;
}