import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, Pressable } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import { exerciseDB } from '../../database/localDB';
import { colors } from '../../constants/Globalstyles';
import HorizontalRule from '../ui/HorizontalRule';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { shrinkBorderRadius, increaseBorderRadius } from '../../util/Animations';
import uuid from 'react-native-uuid';
import { SettingsContext } from '../../store/settings-context';
import { GetPoundsFromKilo } from '../../constants/lookup';
import NumberInput from '../form/NumberInput';

// TODO: toggle to mark as a superset? 
// TODO: max reps marker
// TODO: Fix weird glitching and refreshing weirdness
// TODO: Make the pressable's a bit more stylish
// if number of reps = -1 this indicates a "max reps" set, 
// TODO: Add a "drop set" function

const DEVICE_WIDTH = Dimensions.get('window').width;

const TemplateExerciseItem = ({index, exerciseID, reps, addSet, deleteSet, onDeleteExercise, updateRepsHandler}) => {
    const [exercise, setExercise] = useState(null);
    const settingsCtx = useContext(SettingsContext);
    const swipeRef = useRef(null);
    const borderRadiusAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        exerciseDB.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM exercises WHERE id = (?)',
                [exerciseID],
                (tx, result) => setExercise(result.rows._array[0]),
                (tx, error) => console.warn(`[Error in TemplateExerciseItem] ${error}`)
            );
        });
    }, [exerciseID]);

    function renderRightActionButtons() {
        return (
            <Pressable 
                style={[styles.swipedButtonContainer, {backgroundColor: colors.failure, borderTopRightRadius: 20, borderBottomRightRadius: 20, marginLeft: -15, marginRight: 15}]}
                onPress={() => {
                    swipeRef.current.close();
                    onDeleteExercise(index);
                }}
            >
                <AntDesign name="delete" size={24} color={colors.white} />
            </Pressable>
        );
    }

    if(!exercise) { // Waiting to load exercise information...
        return (
            <Text>Loading content...</Text>
        );
    }

    const animatedStyles = {
        borderTopRightRadius: borderRadiusAnim, 
        borderBottomRightRadius: borderRadiusAnim, 
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
    };

    return (
        <Swipeable
            ref={swipeRef}
            renderRightActions={renderRightActionButtons}
            friction={2}
            onSwipeableWillOpen={() => shrinkBorderRadius(borderRadiusAnim, 200)}
            onSwipeableWillClose={() => increaseBorderRadius(borderRadiusAnim, 200)}
            rightThreshold={0.1 * DEVICE_WIDTH}
            overshootRight={false}
        >
            <Animated.View style={[styles.container, animatedStyles]}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.nameTouchable} onPress={() => console.log("Change exercise...")}>
                        <Text style={styles.nameText}>{exercise.name}</Text>
                        {exercise.isFavorite === 1 && <AntDesign name="star" style={{marginLeft: 10}} color={colors.charcoal} size={24} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("Go to exercise history...")}>
                        <MaterialCommunityIcons name="history" size={28} color={colors.charcoal} />
                    </TouchableOpacity>
                </View>
                <HorizontalRule style={{marginVertical: 12, backgroundColor: colors.lightgray}} />
                <Text style={styles.pbText}>1RM: {(settingsCtx.metricUnits ? exercise.personalBest : GetPoundsFromKilo(exercise.personalBest)).toFixed(1)} {exercise.personalBest && (settingsCtx.metricUnits ? "kg" : "lbs")}</Text>
                {reps.map((nReps, idx) => (
                    <View key={uuid.v4()} style={styles.row}>
                    <View style={styles.repInfoRow}>
                        <NumberInput 
                            placeholder={"12"}
                            placeholderTextColor={colors.gray}
                            value={nReps ? (nReps === -1 ? "MAX" : JSON.stringify(nReps)) : nReps}
                            onChangeText={(text) => updateRepsHandler(index, idx, text)}
                        />
                        <Text style={styles.cross}>reps</Text>
                    </View>
                    <View style={styles.repInfoRow}>
                        <Pressable onPress={() => {
                            const repUpdateValue = nReps !== -1 ? -1 : null;
                            updateRepsHandler(index, idx, repUpdateValue)
                        }} style={styles.toggleBtnWrapper}>
                            <Text style={{marginRight: 3}}>MR</Text>
                            <FontAwesome name={!isNaN(nReps) && nReps === -1 ? "check-square-o" : "square-o"} size={24} color="black" />
                        </Pressable>
                        <Pressable onPress={() => deleteSet(index, idx)}>
                            <AntDesign name="minuscircleo" size={18} color={colors.charcoal} />
                        </Pressable>
                    </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.addSetBtn} onPress={addSet}>
                    <AntDesign name="pluscircleo" size={30} color={colors.charcoal} />
                </TouchableOpacity>
            </Animated.View>
        </Swipeable>
    )
}

export default TemplateExerciseItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: colors.black,
        shadowRadius: 5,
        shadowOpacity: 0.15,
        shadowOffset: {x: 0, y: 0},
        elevation: 5
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    repInfoRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 5
    },

    nameTouchable: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    nameText: {
        fontSize: 22,
        fontWeight: '500'
    },

    addSetBtn: {
        alignSelf: 'center',
        marginTop: 5,
    },

    dataText: {
        fontSize: 18
    },
    
    cross: {
        fontSize: 16,
        marginHorizontal: 3,
        color: colors.gray
    },

    swipedButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.2 * DEVICE_WIDTH,
        marginVertical: 10,
    },

    pbText: {
        color: colors.gray,
        fontSize: 14,
        marginBottom: 5,
    },

    toggleBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    }
})