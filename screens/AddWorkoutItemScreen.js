import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { EmptyWorkout } from '../state/EmptyState';
import { colors } from '../constants/Globalstyles';
import { MaterialIcons } from '@expo/vector-icons';
import AddEmptyWorkoutForm from '../components/form/AddEmptyWorkoutForm';

const AddWorkoutItemScreen = () => {
  const [workout, setWorkout] = useState(EmptyWorkout);
  const [isFromTemplate, setIsFromTemplate] = useState(null);

  if(isFromTemplate === null) {
    return (
      <View style={styles.root}>
        <TouchableOpacity 
          style={styles.optionBtn} 
          onPress={() => console.log('go to select template...')}
        >
          <Text style={styles.btnText}>New workout from template</Text>
        </TouchableOpacity>
        <Text style={styles.spacerText}>or</Text>
        <TouchableOpacity 
          style={styles.optionBtn} 
          onPress={() => setIsFromTemplate(false)}
        >
          <Text style={styles.btnText}>New empty workout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // TODO: Workout name should be dynamic and part of the database?
  if(isFromTemplate !== null) { 
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
         <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Workout 1</Text>
            <Pressable style={styles.deleteBtn} onPress={() => {
              setIsFromTemplate(null);
              setWorkout(EmptyWorkout);
            }}>
              <MaterialIcons name="delete-forever" size={30} color={colors.failure} />
            </Pressable>
         </View>
         <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{`${workout.date.getDate()}/${workout.date.getMonth()+1}/${workout.date.getFullYear()}`}</Text>
         </View>
        </View>
        <AddEmptyWorkoutForm workout={workout} setWorkout={setWorkout} />
      </ScrollView>
    );
  }
}

export default AddWorkoutItemScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  optionBtn: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 35
  },

  spacerText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '300',
    color: colors.gray
  },

  btnText: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.charcoal
  },

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
  }
})