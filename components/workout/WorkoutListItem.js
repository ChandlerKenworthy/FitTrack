import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { GetPoundsFromKilo, muscleGroupIDtoColor } from '../../constants/lookup';
import { useContext, useEffect, useState } from 'react';
import { exerciseDB } from '../../database/localDB';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../store/settings-context';

const WorkoutListItem = ({workout}) => { 
    const settingsCtx = useContext(SettingsContext);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const navigation = useNavigation();

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
        <Pressable onPress={() => navigation.navigate('ViewSingleWorkout', {workout: workout, muscleGroups: muscleGroups})} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.titleText}>{workout.name}</Text>
                <Text style={styles.dateText}>{workout.day}/{workout.month}/{workout.year}</Text>
            </View>
            <View style={[styles.row, {marginTop: 10, justifyContent: 'space-between'}]}>
                <Text style={styles.volumeText}>{settingsCtx.metricUnits ? Math.round(workout.totalVolume) : Math.round(GetPoundsFromKilo(workout.totalVolume))} {settingsCtx.metricUnits ? "kg" : "lb"}</Text>
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
        </Pressable>
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