import { StyleSheet, Text, View, Dimensions } from 'react-native'

const DayPadItem = ({dayNumber, isToday}) => {
  const deviceWidth = Dimensions.get('window').width;
  const adjustedWidth = ((deviceWidth - 20) / 7);
  
  // Calculate the width of the day boxes so 7 fit per row on any device
  const containerStyles = {
    width: adjustedWidth,
    height: adjustedWidth,
    borderRadius: adjustedWidth / 2,
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.text}>{dayNumber}</Text>
    </View>
  )
}

export default DayPadItem

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    text: {
      fontSize: 20,
      fontWeight: '300',
      color: '#ccc'
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