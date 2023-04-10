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
        let queryString = "SELECT muscleGroup_id FROM exercises WHERE id IN (";
        [...new Set(JSON.parse(workout.exercises))].map((exId) => { // remove duplicate exercises
            queryString += exId;
            queryString += ",";
        });
        queryString = queryString.slice(0, -1);
        queryString += ")";
        exerciseDB.transaction(tx => {
            tx.executeSql(
                queryString,
                null,
                (tx, result) => {
                    let muscleGroupIds = [];
                    for(let i = 0; i < result.rows._array.length; i++) {
                        muscleGroupIds.push(Object.values(result.rows._array[i])[0]);
                    }
                    setMuscleGroups([...new Set(muscleGroupIds)]); // remove duplicates
                },
                (tx, error) => console.warn(`[Error in WorkoutListItem.js] ${error}`)
            );
        });
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
                    {muscleGroups.map((muscleGroupId, index) => {
                        return (
                            <View 
                                key={uuid.v4()} 
                                style={[styles.muscleGroupIndicator, {backgroundColor: muscleGroupIDtoColor[muscleGroupId]}, index > 0 && {marginLeft: 5}]}
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
        fontWeight: '700',
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
        fontWeight: '300'
    },

    muscleGroupsWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})