import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useState, useEffect } from 'react';
import { workoutDB } from '../../database/localDB';
import { colors } from '../../constants/Globalstyles';

const DayPadItem = ({dayNumber, date, isToday}) => {
  const deviceWidth = Dimensions.get('window').width;
  const adjustedWidth = ((deviceWidth - 20) / 7);
  const [nWorkouts, setNWorkouts] = useState(null);

  useEffect(() => {
    workoutDB.transaction(tx => {
      tx.executeSql(
        "SELECT COUNT(*) FROM workouts WHERE year == (?) AND month == (?) AND day == (?)",
        [date.getFullYear(), date.getMonth()+1, dayNumber],
        (tx, result) => setNWorkouts(parseInt(Object.values(result.rows._array[0])[0])),
        (tx, error) => console.warn(`[Error in DayPadItem.js] ${error}`)
      );
    });
  }, [date]);
  
  // Calculate the width of the day boxes so 7 fit per row on any device
  const containerStyles = {
    width: adjustedWidth,
    height: adjustedWidth,
    borderRadius: adjustedWidth / 2,
    backgroundColor: isToday ? colors.lightorange : 'transparent'
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.text}>{dayNumber}</Text>
      {!isNaN(parseInt(nWorkouts)) && (
        <View style={styles.exerciseDotWrapper}>
        {Array.apply(null, Array(nWorkouts)).map(function (x, i) { return i; }).map((i) => {
          return <View key={uuid.v4()} style={[styles.dot, dotBkg]}></View>;
        })}
        </View>
      )}
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
      color: colors.gray
    },

    exerciseDotWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },

    dot: {
      height: 6,
      width: 6,
      borderRadius: 3,
      padding: 0,
      marginTop: 5,
      marginHorizontal: 2
    }
})