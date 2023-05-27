import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/Globalstyles';
import RippleButton from '../components/ui/Buttons/RippleButton';

const AddWorkoutItemScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <RippleButton
        style={styles.rippleBtn}
        onTap={() => navigation.navigate('AddWorkoutTemplate')}
      >
        <Text style={styles.rippleBtnText}>New Workout From Template</Text>
      </RippleButton>
      <Text style={styles.spacerText}>or</Text>
      <RippleButton
        style={styles.rippleBtn}
        onTap={() => navigation.navigate('AddWorkout')}
      >
        <Text style={styles.rippleBtnText}>New Empty Workout</Text>
      </RippleButton>
    </View>
  );
}

export default AddWorkoutItemScreen

const styles = StyleSheet.create({
  rippleBtn: {
    borderRadius: '50%',
    backgroundColor: colors.white,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: {x: 0, y: 0},
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rippleBtnText: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.charcoal,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },

  container: {
    marginBottom: 30
  },

  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  spacerText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '300',
    color: colors.gray
  }
})