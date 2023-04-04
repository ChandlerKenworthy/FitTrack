import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { exerciseDB } from '../../database/localDB'
import React, { useEffect, useState } from 'react'
import { colors } from '../../constants/Globalstyles';
import HorizontalRule from '../ui/HorizontalRule';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const WorkoutExerciseBox = ({index, exerciseid, reps, weights, updateReps, updateWeights, addSet, onDeleteExercise}) => {
    const [name, setName] = useState();

    useEffect(() => {
        async function setExerciseName() {
            await exerciseDB.transaction(tx => {
                tx.executeSql(
                    'SELECT name FROM exercises WHERE id = (?)',
                    [exerciseid],
                    (txObj, resultSet) => { setName(resultSet.rows._array[0].name) },
                    (txObj, error) => { console.log('Error retriving from DB') },
                );
            });
        }
        if(exerciseid == null) {
            // Hasn't been supplied yet
            setName("Specify Exercise...");
        } else {
            setExerciseName();
        }
    }, [exerciseid]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.nameText}>{name}</Text>
                <TouchableOpacity onPress={onDeleteExercise.bind(this, index)}>
                    <MaterialIcons name="delete-forever" size={28} color={colors.failure} />
                </TouchableOpacity>
            </View>
            <HorizontalRule style={{marginVertical: 12, backgroundColor: colors.lightgray}} />
            {reps.map((nReps, index) => {
                return (
                    <View key={index} style={styles.infoContainer}>
                        <Text style={styles.infoText}>Set {index+1}: {nReps ? nReps : "?"} x {weights[index] ? weights[index] : "?"} kg ({nReps*weights[index]} kg)</Text>
                        <Pressable style={styles.editIconContainer} onPress={() => console.log('edit menu')}>
                            <MaterialIcons name="edit" size={24} color={colors.charcoal} />
                        </Pressable>
                    </View>
                );
            })}
            <Pressable style={styles.addSetBtn} onPress={addSet.bind(this, index)}>
                <AntDesign name="pluscircleo" size={30} color={colors.charcoal} />
            </Pressable>
        </View>
    )
}

export default WorkoutExerciseBox

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingTop: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 20
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    nameText: {
        fontWeight: '500',
        fontSize: 22
    },

    infoText: {
        fontSize: 18,
        fontWeight: '300'
    },

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },

    addSetBtn: {
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center'
    }
})