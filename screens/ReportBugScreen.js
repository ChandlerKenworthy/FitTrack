import { StyleSheet, TouchableOpacity, View } from 'react-native'
import BottomSheet from '../components/ui/BottomSheet'
import React, { useCallback, useRef } from 'react'
import { colors } from '../constants/Globalstyles'

const ReportBugScreen = () => {
  const ref = useRef(null);
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if(isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-400);
    }
  }, []);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} />
      <BottomSheet ref={ref}>
        <View style={{flex: 1, backgroundColor: 'orange'}}></View>
      </BottomSheet>
    </View>
  )
}

export default ReportBugScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    height: 60,
    aspectRatio: 1,
    backgroundColor: colors.black,
    borderRadius: 30,
    opacity: 0.6,
  }
})