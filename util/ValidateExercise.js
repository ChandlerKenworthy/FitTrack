import { muscleGroupIDtoString, scoreTypeIDtoString } from "../constants/lookup";

export function ValidateExercise(name, muscleGroupID, scoreTypeID) {
    if(!Object.keys(muscleGroupIDtoString).map(i => parseInt(i)).includes(muscleGroupID)) {
        return "Invalid muscle group selected (somehow)!";
    }
    if(!Object.keys(scoreTypeIDtoString).map(i => parseInt(i)).includes(scoreTypeID)) {
        console.log(`You gave me ${scoreTypeID}`);
        return "Invalid score type selected (somehow)!";
    }
    if(name.length < 3) {
        return "Exercise names must be at least 3 characters long";
    }
    return true;
}