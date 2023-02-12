import { StyleSheet, Text, View } from 'react-native'
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

    function exerciseRecordingModeHandler(option) {
        setExercise((prevExercise) => {
            return {
                ...prevExercise,
                record: option
            }
        });
    }

    function updateCategoryHandler(category) {
        setExercise((prevExercise) => {
            return {
                ...prevExercise,
                category: category
            }
        });
    }

    const exerciseRecordingOptions = [
        'Weight & Reps',
        'Time',
        'Distance'
    ];

    const muscleGroupOptions = [
        'Chest', 'Back', 'Legs', 'Shoulders', 'Tricep', 'Bicep'
    ]; // category = 0, 1, 2, 3, 4, 5

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
                        options={muscleGroupOptions}
                        selectedOption={exercise.category}
                        setSelectedOption={updateCategoryHandler}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputPromptText}>Mode</Text>
                    <RadioInput 
                        options={exerciseRecordingOptions} 
                        selectedOption={exercise.record} 
                        setSelectedOption={exerciseRecordingModeHandler} 
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