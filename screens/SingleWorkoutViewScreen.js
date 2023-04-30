import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { colors } from '../constants/Globalstyles';
import WorkoutOverview from '../components/ui/ViewWorkout/WorkoutOverview';
import WorkoutExerciseItem from '../components/ui/ViewWorkout/WorkoutExerciseItem';
import { useContext } from 'react';
import { SettingsContext } from '../store/settings-context';

const SingleWorkoutViewScreen = ({route, navigation}) => {
    const {workout, muscleGroups} = route.params;
    const settingsCtx = useContext(SettingsContext);

    return (
        <ScrollView style={{flex: 1, marginBottom: 30}}>
            <WorkoutOverview workout={workout} muscleGroups={muscleGroups} />
            <View style={styles.exercisesContainer}>
                <Text style={styles.exerciseHeaderText}>Exercises</Text>
                <View style={[styles.exerciseListContainer, {backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.white}]}>
                    {JSON.parse(workout.exercises).map((item, index) => {
                        return (
                            <WorkoutExerciseItem 
                                key={index}
                                exerciseId={item}  
                                weights={JSON.parse(workout.weights)[index]}
                                reps={JSON.parse(workout.reps)[index]}
                                style={JSON.parse(workout.exercises).length !== index+1 ? {marginBottom: 10} : null}
                            />
                        );
                    })}
                </View>
            </View>
        </ScrollView> 
    )
}

export default SingleWorkoutViewScreen

const styles = StyleSheet.create({
    exercisesContainer: {
        marginHorizontal: 15
    },

    exerciseHeaderText: {
        fontSize: 16,
        color: colors.gray,
        marginLeft: 20,
    },

    exerciseListContainer: {
        borderRadius: 20,
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },

    separator: {
        marginVertical: 10,
    }
})