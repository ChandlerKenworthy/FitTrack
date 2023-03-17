import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/Globalstyles'

const HorizontalRule = ({style}) => {
  return (
    <View style={[styles.horizontalRule, style]}>
    </View>
  )
}

export default HorizontalRule

const styles = StyleSheet.create({
    horizontalRule: {
        height: 1,
        width: '100%',
        backgroundColor: colors.gray
    }
})