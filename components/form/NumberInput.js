import { StyleSheet, TextInput, View } from 'react-native'
import React, { useContext } from 'react'

const NumberInput = ({placeholder, placeholderTextColor, value, onChangeText, style}) => {
  return (
    <View>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        autoCapitalize='none'
        autoComplete='off'
        inputMode='numeric'
        maxLength={5}
        style={[styles.inputText, style && style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default NumberInput

const styles = StyleSheet.create({
    inputText: {
        fontSize: 18,
        fontWeight: '300'
    }
})