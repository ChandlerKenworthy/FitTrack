import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import DayItem from '../components/calendar/DayItem';

const CalendarScreen = ({navigation}) => {
  const today = new Date();
  const [date, setDate] = useState(new Date(today.getFullYear(), today.getMonth()+1, 0)); // Get today's date 

  function changeDate(forward) {
    setDate(prevDate => {
      let year = prevDate.getFullYear();
      let monthIdx = prevDate.getMonth();
      if(monthIdx !== 11 && forward) { // Not a special case 
        monthIdx += 2;
      } else if(monthIdx !== 0 && !forward) {
        // don't actually need to do anything here 
      } else if(monthIdx === 11 && forward) {
        year += 1;
        monthIdx = 1; // Not zero because we always work with month+1
      } else { // Must be an index zero going backwards 
        monthIdx = 0;
      }
      return new Date(year, monthIdx, 0);
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Pressable style={styles.dateCaret} onPress={() => changeDate(false)}>
            <AntDesign name="caretleft" size={16} color="black" />
          </Pressable>
          <Pressable onPress={() => setDate(new Date())}>
            <Text style={styles.titleText}>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</Text>
          </Pressable>
          <Pressable style={styles.dateCaret} onPress={() => changeDate(true)}>
            <AntDesign name="caretright" size={16} color="black" />
          </Pressable>
        </View>
        <View style={styles.monthContainer}>
          {Array.from({length: date.getDate()}, (_, i) => i + 1).map((dayNumber) => {
            return <DayItem key={dayNumber} dayNumber={dayNumber} />
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CalendarScreen;

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20
  },

  dateCaret: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10
  },

  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0
  }
})