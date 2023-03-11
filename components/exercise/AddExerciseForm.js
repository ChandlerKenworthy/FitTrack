import { StyleSheet, Text, View } from 'react-native'
import { muscleGroupIDtoString, scoreTypeIDtoString } from '../../constants/lookup';
import BasicTextInput from '../form/BasicTextInput';
import PickerInput from '../form/PickerInput';
import RadioInput from '../form/RadioInput';

const AddExerciseForm = ({exercise, setExercise}) => {
    function exerciseNameHandler(text) {
        setExercise((prevExercise) => {
            return {
                ...prevExercise,
                name: text
            };
        });
    }

    function changeScoreTypeHandler(id) {
        setExercise((prevExercise) => {
            return {
                ...prevExercise,
                scoreTypeID: parseInt(id)
            }
        });
    }

    function changeMuscleGroupHandler(id) {
        setExercise((prevExercise) => {
            return {
                ...prevExercise,
                muscleGroupID: parseInt(id)
            }
        });
    }

    return (
        <View style={styles.root}>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputPromptText}>Exercise Name</Text>
                    <BasicTextInput 
                        placeholder="Name"
                        value={exercise.name}
                        onChangeText={exerciseNameHandler}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputPromptText}>Category</Text>
                    <PickerInput 
                        options={muscleGroupIDtoString}
                        selectedOption={exercise.muscleGroupID}
                        setSelectedOption={changeMuscleGroupHandler}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputPromptText}>Mode</Text>
                    <RadioInput 
                        options={scoreTypeIDtoString} 
                        selectedOption={exercise.scoreTypeID} 
                        setSelectedOption={changeScoreTypeHandler} 
                    />
                </View>
            </View>
        </View>
  )
}

export default AddExerciseForm

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },

    inputPromptText: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 15
    },

    inputContainer: {
        marginTop: 30
    }
})