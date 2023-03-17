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

  if(isFromTemplate !== null) { 
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.deleteBtn} onPress={() => {
            setIsFromTemplate(null);
            setWorkout(EmptyWorkout);
          }}>
            <MaterialIcons name="delete-forever" size={30} color={colors.failure} />
          </Pressable>
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
    marginVertical: 10,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
})