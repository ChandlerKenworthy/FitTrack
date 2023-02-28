import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/Globalstyles'
import { AntDesign } from '@expo/vector-icons';

const PopupInfo = ({children, highlightColor, setDismissed}) => {
  return (
    <View style={[styles.container, {borderColor: highlightColor}]}>
      <Text style={[styles.text, {color: highlightColor}]}>{children}</Text>
      <Pressable onPress={setDismissed} style={styles.dismissContainer}>
        <AntDesign name="closecircleo" size={26} color={highlightColor} />
      </Pressable>
    </View>
  )
}

export default PopupInfo

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 100,
        top: 20,
        left: 15,
        right: 15,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 2,
        flexDirection: 'row',
        overflow: 'hidden'
    },

    dismissContainer: {
        position: 'absolute',
        right: 15,
    },

    text: {
        fontWeight: '500',
        fontSize: 22,
        textAlign: 'center'
    },
})