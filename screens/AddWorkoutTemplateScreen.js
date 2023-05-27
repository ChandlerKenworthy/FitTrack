import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddWorkoutTemplateScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Text>Add templates here. They should include the exercise, reps and sets</Text>
      <Button title={"Go Back"} onPress={() => navigation.goBack()} />
    </ScrollView>
  )
}

export default AddWorkoutTemplateScreen

const styles = StyleSheet.create({})