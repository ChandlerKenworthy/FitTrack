import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import DayItem from '../components/calendar/DayItem';
import DayPadItem from '../components/calendar/DayPadItem';
import { colors } from '../constants/Globalstyles';
import { SettingsContext } from '../store/settings-context';

const CalendarScreen = ({navigation}) => {
  const today = new Date();
  const [date, setDate] = useState(new Date(today.getFullYear(), today.getMonth()+1, 0)); // Get today's date 
  const padDays = new Date(date.getFullYear(), date.getMonth()).getDay() - 1; // Number of days to pad by to make days line up
  const settingsCtx = useContext(SettingsContext);

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

  function getPrevMonth() {
    let month = date.getMonth() - 1;
    if(month < 0) {
      month += 12;
    }
    return month;
  }

  function getIsToday(day, prevMonth) {
    let month = date.getMonth();
    if(prevMonth) {
      month = getPrevMonth();
    }
    const daysMatch = day == today.getDate(); 
    const monthsMatch = today.getMonth() == month;
    const yearsMatch = today.getFullYear() == date.getFullYear();
    return daysMatch && monthsMatch && yearsMatch;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Pressable style={styles.dateCaret} onPress={() => changeDate(false)}>
            <AntDesign name="caretleft" size={16} color={settingsCtx.darkMode ? colors.white : colors.charcoal} />
          </Pressable>
          <Pressable onPress={() => setDate(new Date(today.getFullYear(), today.getMonth()+1, 0))}>
            <Text style={[styles.titleText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</Text>
          </Pressable>
          <Pressable style={styles.dateCaret} onPress={() => changeDate(true)}>
            <AntDesign name="caretright" size={16} color={settingsCtx.darkMode ? colors.white : colors.charcoal} />
          </Pressable>
        </View>
        <View style={styles.monthKey}>
          <Text style={[styles.monthKeyText, {color: settingsCtx.darkMode ? colors.white : colors.gray}]}>M</Text>
          <Text style={[styles.monthKeyText, {color: settingsCtx.darkMode ? colors.white : colors.gray}]}>T</Text>
          <Text style={[styles.monthKeyText, {color: settingsCtx.darkMode ? colors.white : colors.gray}]}>W</Text>
          <Text style={[styles.monthKeyText, {color: settingsCtx.darkMode ? colors.white : colors.gray}]}>T</Text>
          <Text style={[styles.monthKeyText, {color: settingsCtx.darkMode ? colors.white : colors.gray}]}>F</Text>
          <Text style={[styles.monthKeyText, {color: settingsCtx.darkMode ? colors.white : colors.gray}]}>S</Text>
          <Text style={[styles.monthKeyText, {color: settingsCtx.darkMode ? colors.white : colors.gray}]}>S</Text>
        </View>
        <View style={styles.monthContainer}>
        {Array.from({length: padDays}, (_, i) => i + 1).map((dayNumber) => {
            return (
              <DayPadItem 
                key={dayNumber} 
                dayNumber={new Date(date.getFullYear(), getPrevMonth()+1, 0).getDate() - (padDays - dayNumber)} 
                isToday={getIsToday(dayNumber, true)} 
              />
          )})}
          {Array.from({length: date.getDate()}, (_, i) => i + 1).map((dayNumber) => {
            return <DayItem key={dayNumber} dayNumber={dayNumber} isToday={getIsToday(dayNumber, false)} nworkouts={2} />
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
    marginHorizontal: 20,
  },

  dateCaret: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10
  },

  monthKey: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginVertical: 15,
  },

  monthKeyText: {
    width: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '300',
  },

  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
  }
})