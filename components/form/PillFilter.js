import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/Globalstyles'

const PillFilter = ({id, name, isSelected, setIsSelected, style}) => {
  return (
    <Pressable 
      onPress={setIsSelected.bind(this, id)}
      style={[styles.container, isSelected && styles.containerSelected, style && style]}
    >
      <Text style={[styles.text, isSelected && styles.textSelected]}>{name}</Text>
    </Pressable>
  )
}

export default PillFilter

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 5
  },

  containerSelected: {
    borderWidth: 1,
    borderColor: colors.lightorange
  },

  text: {
    color: colors.charcoal,
    fontWeight: '300',
    fontSize: 16
  },

  textSelected: {
    color: colors.lightorange
  },
})