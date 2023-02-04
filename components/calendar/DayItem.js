import { StyleSheet, Text, View } from 'react-native'

const DayItem = ({dayNumber}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{dayNumber}</Text>
      <View style={styles.exerciseDotWrapper}>
        <View style={styles.dot}></View>
      </View>
    </View>
  )
}

export default DayItem

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        margin: 5,
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
      fontSize: 20,
      fontWeight: '300'
    },

    exerciseDotWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },

    dot: {
      backgroundColor: 'orange',
      height: 6,
      width: 6,
      borderRadius: 3,
      padding: 0,
      marginTop: 5,
    }
})