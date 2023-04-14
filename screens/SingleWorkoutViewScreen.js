import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { colors } from '../constants/Globalstyles';
import WorkoutOverview from '../components/ui/ViewWorkout/WorkoutOverview';
import WorkoutExerciseItem from '../components/ui/ViewWorkout/WorkoutExerciseItem';

const SingleWorkoutViewScreen = ({route, navigation}) => {
    const {workout, muscleGroups} = route.params;

    return (
        <SafeAreaView style={{flex: 1}}>
            <WorkoutOverview workout={workout} muscleGroups={muscleGroups} />
            <View style={styles.exercisesContainer}>
                <Text style={styles.exerciseHeaderText}>Exercises</Text>
                <View style={styles.exerciseListContainer}>
                    <FlatList 
                        data={JSON.parse(workout.exercises)} // Convert string to array
                        keyExtractor={({item, index}) => index}
                        renderItem={({item, index}) => {
                            return (
                                <WorkoutExerciseItem 
                                    key={index}
                                    exerciseId={item}  
                                    weights={JSON.parse(workout.weights)[index]}
                                    reps={JSON.parse(workout.reps)[index]}
                                />
                            )
                        }} // item is the exercise ID
                        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                    />
                </View>
            </View>
        </SafeAreaView> 
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
        backgroundColor: colors.white
    },

    separator: {
        marginVertical: 10,
    }
})