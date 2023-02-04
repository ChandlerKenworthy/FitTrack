import { StyleSheet, Text, View, Dimensions } from 'react-native'

const DayItem = ({dayNumber, nworkouts, isToday}) => {
  const deviceWidth = Dimensions.get('window').width;
  const adjustedWidth = ((deviceWidth - 20) / 7);

  
  // Calculate the width of the day boxes so 7 fit per row on any device
  const containerStyles = {
    width: adjustedWidth,
    height: adjustedWidth,
    borderRadius: adjustedWidth / 2,
    backgroundColor: isToday ? '#FB8500' : 'transparent'
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.text, isToday && {color: 'white'}]}>{dayNumber}</Text>
      {/*<View style={styles.exerciseDotWrapper}>
        {
        Array.apply(null, Array(nworkouts)).map(function (x, i) { return i; }).map((i) => {
          return <View style={styles.dot}></View>;
        })}
      </View>*/}
    </View>
  )
}

export default DayItem

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginVertical: 3,
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
      marginHorizontal: 2
    }
})