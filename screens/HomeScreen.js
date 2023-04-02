import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CircleIconButton from '../components/ui/CircleIconButton';
import { useUserAuth } from '../store/UserAuthContext';
import { colors } from '../constants/Globalstyles';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../store/settings-context';

const HomeScreen = ({navigation}) => {
  const { user, logOut } = useUserAuth();
  const settingsCtx = useContext(SettingsContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <Text style={styles.noWorkoutText}>Workout log empty</Text>
        <View style={styles.addWorkoutBtnContainer}>
          <CircleIconButton 
            onPress={() => console.log("I add workout")} 
            icon="plus" size={46} scale={0.8} 
            color={colors.lightorange} 
            bgColor={settingsCtx.darkMode ? colors.extralightblack : colors.white}
          />
        </View>
        <View style={styles.switchViewBtnContainer}>
          <CircleIconButton 
            onPress={() => navigation.navigate('Calendar')} 
            icon="calendar" size={46} 
            scale={0.8} 
            color={colors.lightorange} 
            bgColor={settingsCtx.darkMode ? colors.extralightblack : colors.white}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noWorkoutText: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.lightgray
  },

  addWorkoutBtnContainer: {
    position: "absolute",
    bottom: 20,
    right: 35
  },

  switchViewBtnContainer: {
    position: 'absolute',
    bottom: 20,
    left: 35
  }
});