import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { SettingsContext } from '../store/settings-context';
import React, { useState, useContext, useEffect, useRef } from 'react'
import BasicTextInput from '../components/form/BasicTextInput';
import { EmptyWorkout } from '../state/EmptyState';
import { colors } from '../constants/Globalstyles';
import AddEmptyWorkoutForm from '../components/form/AddEmptyWorkoutForm';
import { workoutDB } from '../database/localDB';
import { CleanWorkout, SaveWorkout } from '../util/SaveWorkout';
import { useIsFocused } from '@react-navigation/native';
import RippleButton from '../components/ui/Buttons/RippleButton';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const AddWorkoutScreen = ({navigation}) => {
    const settingsCtx = useContext(SettingsContext);
    const [workout, setWorkout] = useState(EmptyWorkout);
    const isFocused = useIsFocused();
    const ScrollRef = useRef(null);

    function submitWorkoutHandler() {
        let workoutCopy = workout;
        workoutCopy = CleanWorkout(workoutCopy, settingsCtx.metricUnits);
        SaveWorkout(workoutCopy);
        setWorkout(EmptyWorkout);
        navigation.navigate('Home'); // Navigate back to home screen
    }

    function AddExerciseHandler() {
        const newWorkout = {
            ...workout,
            exercises: [...workout.exercises, null], // unknown exercise 
            reps: [...workout.reps, [null]], // don't know how many reps are in the sets yet
            weights: [...workout.weights, [null]], // defautl to previous value from history?
        };
        setWorkout(newWorkout);
    }

    function updateNameHandler(text) {
        setWorkout({
            ...workout,
            name: text
        });
    }

    function UpdateWorkoutName() {
        workoutDB.transaction(tx => {
            tx.executeSql(
                "SELECT COUNT(*) FROM workouts",
                null,
                (tx, result) => {
                    setWorkout({
                      ...EmptyWorkout,
                      name: `Workout ${Object.values(result.rows._array[0])[0]+1}`
                    })
                },
                (tx, error) => console.warn(`[Error in AddWorkoutItemScreen.js] ${error}`)
            );
        });
    }

    useEffect(() => {
        UpdateWorkoutName()
    }, [isFocused]);

    return ( // TODO: Fix this make it a flatlist or something just fix it
        <ScrollView 
            ref={ScrollRef} 
            contentContainerStyle={{flexGrow: 1}}
            onContentSizeChange={() => ScrollRef.current.scrollToEnd()}    
        >
            <View>
                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="ios-return-down-back" size={26} color={colors.black} />
                        </TouchableOpacity>
                        <BasicTextInput 
                            value={workout.name}
                            onChangeText={updateNameHandler}
                            placeholder={"Workout Name"}
                            showBorder={false}
                            style={{fontSize: 24, fontWeight: '700'}}
                        />
                        <TouchableOpacity onPress={() => {
                            setWorkout(EmptyWorkout);
                            UpdateWorkoutName();
                        }}>
                            <MaterialCommunityIcons name="delete" size={26} color={colors.black} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.dateText}>{`${workout.date.getDate()}/${workout.date.getMonth()+1}/${workout.date.getFullYear()}`}</Text>
                </View>
                <AddEmptyWorkoutForm workout={workout} setWorkout={setWorkout} />
            </View>
            <View style={styles.submitBtnWrapper}>
                <RippleButton
                    style={styles.rippleBtn}
                    onTap={submitWorkoutHandler}
                >
                    <AntDesign name="check" size={55} color={colors.lightorange} />
                </RippleButton>
            </View>
            <View style={styles.addExerciseBtnWrapper}>
                <RippleButton style={styles.rippleBtn} onTap={AddExerciseHandler}>
                    <AntDesign name="plus" size={55} color={colors.lightorange} />
                </RippleButton>
            </View>
        </ScrollView>
    )
}

export default AddWorkoutScreen

const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: 15,
        marginTop: 15,
      },
    
      titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
    
      dateText: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 15,
        color: colors.gray,
        fontSize: 16,
      },
    
      submitBtnWrapper: {
        position: 'absolute',
        bottom: 30,
        right: 15,
      },

      addExerciseBtnWrapper: {
        position: 'absolute',
        bottom: 30,
        left: 15,
      },

      rippleBtn: {
        borderRadius: '50%',
        width: 90,
        height: 90,
        backgroundColor: colors.white,
        elevation: 5,
        shadowRadius: 5,
        shadowOffset: {x: 0, y: 0},
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})