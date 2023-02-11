import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/Globalstyles';
import BasicTextInput from '../form/BasicTextInput';
import RadioInput from '../form/RadioInput';
import CircleIconButton from '../ui/CircleIconButton';

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
        })
    }

    const exerciseRecordingOptions = [
        'Weight & Reps',
        'Time',
        'Distance'
    ];

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
                    <BasicTextInput 
                        placeholder="chest"
                        value={""}
                        onChangeText={() => {}}
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
            <View style={styles.submitContainer}>
                <CircleIconButton icon={"check"} onPress={()=>{}} size={40} color={colors.lightorange} scale={0.8} />
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
    },

    submitContainer: {
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 20,
    }
})