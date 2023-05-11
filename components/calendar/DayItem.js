import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { colors } from '../../constants/Globalstyles';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../store/settings-context';
import { workoutDB } from '../../database/localDB';
import uuid from 'react-native-uuid';

const DayItem = ({date, dayNumber, isToday, isSelected, onPress}) => {
  const deviceWidth = Dimensions.get('window').width;
  const adjustedWidth = ((deviceWidth - 20) / 7);
  const settingsCtx = useContext(SettingsContext);
  const [nWorkouts, setNWorkouts] = useState(null);

  useEffect(() => {
    workoutDB.transaction(tx => {
      tx.executeSql(
        "SELECT COUNT(*) FROM workouts WHERE year == (?) AND month == (?) AND day == (?)",
        [date.getFullYear(), date.getMonth()+1, dayNumber],
        (tx, result) => setNWorkouts(parseInt(Object.values(result.rows._array[0])[0])),
        (tx, error) => console.warn(`[Error in DayItem.js] ${error}`)
      );
    });
  }, [date]);
  
  // Calculate the width of the day boxes so 7 fit per row on any device
  const containerStyles = {
    width: adjustedWidth,
    height: adjustedWidth,
    borderRadius: adjustedWidth / 2,
    backgroundColor: isToday ? colors.lightorange : 'transparent',
    borderWidth: isSelected ? 2 : 0,
    borderColor: isSelected ? colors.lightorange : 'transparent'
  };

  const dotBkg = {
    backgroundColor: isToday ? colors.white : colors.lightorange,
  };

  return (
    <Pressable
      style={[styles.container, containerStyles]}
      onPress={onPress}
    >
      <Text style={[styles.text, isToday && {color: colors.white}, settingsCtx.darkMode && {color: colors.white}]}>{dayNumber}</Text>
      {!isNaN(parseInt(nWorkouts)) && (
        <View style={styles.exerciseDotWrapper}>
        {Array.apply(null, Array(nWorkouts)).map(function (x, i) { return i; }).map((i) => {
          return <View key={uuid.v4()} style={[styles.dot, dotBkg]}></View>;
        })}
        </View>
      )}
    </Pressable>
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
      height: 6,
      width: 6,
      borderRadius: 3,
      padding: 0,
      marginTop: 5,
      marginHorizontal: 2
    }
})