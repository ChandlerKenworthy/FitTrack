import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 22,
        fontWeight: "300"
    }
});