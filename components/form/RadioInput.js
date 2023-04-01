import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { useContext } from 'react'
import { SettingsContext } from '../../store/settings-context'

const RadioInput = ({options, selectedOption, setSelectedOption}) => {
  const settingsCtx = useContext(SettingsContext);

  return (
    <View>
      {Object.entries(options).map(([id, optionName]) => {
        const isSelected = id == selectedOption;
        return (
          <Pressable 
            style={styles.radioOptionContainer} 
            key={optionName}
            onPress={setSelectedOption.bind(this, id)} 
          >
            <View style={[styles.radioIcon, isSelected && styles.radioIconSelected]}>
              {isSelected && <View style={styles.radioIconSelectedInnerCircle}></View>}
            </View>
            <Text style={[styles.radioText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>{optionName}</Text>  
          </Pressable>
        );
      })}
    </View>
  )
}

export default RadioInput

const styles = StyleSheet.create({
  radioOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },

  radioIcon: {
    height: 30,
    width: 30,
    marginRight: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.gray
  },

  radioIconSelected: {
    borderColor: colors.lightorange,
    justifyContent: 'center',
    alignItems: 'center'
  },

  radioIconSelectedInnerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: colors.lightorange
  },

  radioText: {
    fontSize: 18
  }
})