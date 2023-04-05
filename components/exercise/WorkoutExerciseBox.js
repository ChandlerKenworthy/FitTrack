import { Pressable, StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import { exerciseDB } from '../../database/localDB'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../constants/Globalstyles';
import HorizontalRule from '../ui/HorizontalRule';
import { AntDesign } from '@expo/vector-icons';
import NumberInput from '../form/NumberInput';
import { Swipeable } from 'react-native-gesture-handler';
const deviceWidth = Dimensions.get('window').width;

const WorkoutExerciseBox = ({index, exerciseid, reps, weights, updateReps, updateWeights, addSet, onDeleteExercise}) => {
    const [name, setName] = useState();
    const swipeRef = useRef(null);
    const borderRadiusAnim = useRef(new Animated.Value(20)).current;

    const shrinkBorderRadius = () => {
        // Will change borderRadiusAnim value to 1 in 2 seconds
        Animated.timing(borderRadiusAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        }).start();
    };

    const increaseBorderRadius = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(borderRadiusAnim, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
        }).start();
    };

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
            setName("Pick Exercise");
        } else {
            setExerciseName();
        }
    }, [exerciseid]);

    function renderRightActionButtons() {
        return (
            <Pressable 
                style={[styles.swipedButtonContainer, {backgroundColor: colors.failure, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}
                onPress={() => {
                    // shrinkExerciseAway()
                    onDeleteExercise(index);
                }}
            >
                <AntDesign name="delete" size={24} color={colors.white} />
            </Pressable>
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
            onSwipeableWillOpen={() => shrinkBorderRadius()}
            onSwipeableWillClose={() => increaseBorderRadius()}
            rightThreshold={0.1 * deviceWidth}
            overshootRight={false}
        >
            <Animated.View style={[styles.container, animatedStyles]}>
                <View style={styles.row}>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <HorizontalRule style={{marginVertical: 12, backgroundColor: colors.lightgray}} />
                {reps.map((nReps, i) => {
                    return (
                        <View key={i} style={styles.infoContainer}>
                            <NumberInput 
                                placeholder={"reps"}
                                value={nReps}
                                onChangeText={(text) => updateReps(index, i, text)} // TODO: Implement
                                style={{fontWeight: '700'}}
                            />
                            <Text style={styles.infoText}> x </Text>
                            <NumberInput 
                                placeholder={"weight"}
                                value={weights[i]}
                                onChangeText={(text) => updateWeights(index, i, text)}  // TODO: Implement
                                style={{fontWeight: '700'}}
                            />
                            <Text style={styles.infoText}> kg</Text>
                        </View>
                    );
                })}
                <Pressable style={styles.addSetBtn} onPress={addSet.bind(this, index)}>
                    <AntDesign name="pluscircleo" size={30} color={colors.charcoal} />
                </Pressable>
            </Animated.View>
        </Swipeable>
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
        marginVertical: 10,
    },

    swipedButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.2 * deviceWidth,
        marginVertical: 10,
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

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },

    addSetBtn: {
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center'
    },

    infoText: {
        fontSize: 18,
        fontWeight: '300'
    }
})