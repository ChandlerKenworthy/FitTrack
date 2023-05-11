import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../../constants/Globalstyles'
import { SettingsContext } from '../../store/settings-context'

const PillFilter = ({id, name, isSelected, setIsSelected, style}) => {
  const settingsCtx = useContext(SettingsContext);
  const bkgColor = settingsCtx.darkMode ? colors.extralightblack : colors.white;
  const txtColor = settingsCtx.darkMode ? colors.white : colors.charcoal;

  return (
    <Pressable 
      onPress={setIsSelected.bind(this, id)}
      style={[styles.container, {backgroundColor: bkgColor}, isSelected && styles.containerSelected, style && style]}
    >
      <Text style={[styles.text, {color: txtColor}, isSelected && styles.textSelected]}>{name}</Text>
    </Pressable>
  )
}

export default PillFilter

const styles = StyleSheet.create({
  container: {
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
    fontWeight: '300',
    fontSize: 16
  },

  textSelected: {
    color: colors.lightorange
  },
})