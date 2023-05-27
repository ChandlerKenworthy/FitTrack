import { ScrollView, StyleSheet, Text, View, Pressable, Button } from 'react-native'
import { SettingsContext } from '../store/settings-context';
import React, { useState, useContext, useEffect } from 'react'
import BasicTextInput from '../components/form/BasicTextInput';
import { EmptyWorkout } from '../state/EmptyState';
import { colors } from '../constants/Globalstyles';
import { MaterialIcons } from '@expo/vector-icons';
import AddEmptyWorkoutForm from '../components/form/AddEmptyWorkoutForm';
import LoginButton from '../components/ui/Login/LoginButton';
import { workoutDB } from '../database/localDB';
import { CleanWorkout, SaveWorkout } from '../util/SaveWorkout';
import { useIsFocused } from '@react-navigation/native';

const AddWorkoutScreen = ({navigation}) => {
    const settingsCtx = useContext(SettingsContext);
    const [workout, setWorkout] = useState(EmptyWorkout);
    const isFocused = useIsFocused();

    function submitWorkoutHandler() {
        let workoutCopy = workout;
        workoutCopy = CleanWorkout(workoutCopy, settingsCtx.metricUnits);
        SaveWorkout(workoutCopy);
        setWorkout(EmptyWorkout);
        navigation.navigate('Home'); // Navigate back to home screen
    }

    function updateNameHandler(text) {
        setWorkout({
            ...workout,
            name: text
        });
    }

    useEffect(() => {
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
      }, [isFocused]);

    return (
        <ScrollView>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                <BasicTextInput 
                    value={workout.name}
                    onChangeText={updateNameHandler}
                    placeholder={"Workout Name"}
                    showBorder={false}
                    style={{fontSize: 24, fontWeight: '700'}}
                />
                    <Pressable onPress={() => navigation.goBack()}>
                    <MaterialIcons name="delete-forever" size={30} color={colors.failure} />
                    </Pressable>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{`${workout.date.getDate()}/${workout.date.getMonth()+1}/${workout.date.getFullYear()}`}</Text>
                </View>
            </View>
            <AddEmptyWorkoutForm workout={workout} setWorkout={setWorkout} />
            <View style={styles.submitBtnWrapper}>
                <LoginButton text={"Submit"} onPress={submitWorkoutHandler} iconName={"checkcircleo"} />
            </View>
            <Button title={"Go back"} onPress={() => navigation.goBack()} />
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
    
      dateContainer: {
        marginTop: 5,
        marginBottom: 15,
      },
    
      dateText: {
        color: colors.gray,
        fontSize: 16,
      },
    
      titleText: {
        fontSize: 28,
        fontWeight: '700',
        marginRight: 20
      },
    
      submitBtnWrapper: {
        marginHorizontal: 15,
        marginTop: 20,
      }
})