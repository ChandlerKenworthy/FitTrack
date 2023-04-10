import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { muscleGroupIDtoColor } from '../../constants/lookup';
import { useEffect, useState } from 'react';
import { exerciseDB } from '../../database/localDB';
import uuid from 'react-native-uuid';

const WorkoutListItem = ({workout}) => { 
    const [muscleGroups, setMuscleGroups] = useState([]);
    const workoutDate = new Date(workout.date);

    useEffect(() => {
        // Empty state first
        setMuscleGroups([]);
        exerciseDB.transaction(tx => {
            JSON.parse(workout.exercises).map(exId => {
                tx.executeSql(
                    "SELECT muscleGroup_id FROM exercises WHERE id = (?)",
                    [exId],
                    (tx, result) => setMuscleGroups(prevGroups => [...prevGroups, Object.values(result.rows._array[0])[0]]),
                    (tx, error) => console.warn(`[Error in WorkoutListItem.js] ${error}`)
                );
            });
        });
        setMuscleGroups(prevGroups => [...new Set(prevGroups)]); // Remove duplicates
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.titleText}>{workout.name}</Text>
                <Text style={styles.dateText}>{workoutDate.toDateString()}</Text>
            </View>
            <View style={[styles.row, {marginTop: 10, justifyContent: 'space-between'}]}>
                <Text style={styles.volumeText}>{workout.totalVolume} kg</Text>
                <View style={styles.muscleGroupsWrapper}>
                    {muscleGroups.map(muscleGroupId => {
                        return (
                            <View 
                                key={uuid.v4()} 
                                style={[styles.muscleGroupIndicator, {backgroundColor: muscleGroupIDtoColor[muscleGroupId]}]}
                            ></View>
                        );
                    })}
                </View>
            </View>
        </View>
    )
}

export default WorkoutListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    titleText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.charcoal
    },

    dateText: {
        fontSize: 16,
        color: colors.gray
    },

    muscleGroupIndicator: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },

    volumeText: {
        fontSize: 16,
        fontWeight: '700'
    },

    muscleGroupsWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})