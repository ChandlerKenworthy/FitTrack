import { useContext, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { AntDesign } from '@expo/vector-icons';
import { SettingsContext } from '../../store/settings-context';

/*
 * Picker component where the user is able to select one option
 * only from a given set of options. Presented as a drodown menu
 * to the user
 * 
 * PARAMS
 * - 
 * -
 */

const PickerInput = ({options, selectedOption, setSelectedOption}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const settingsCtx = useContext(SettingsContext);

  function selectOptionHandler(optionIndex) {
    setOptionsOpen(!optionsOpen);
    setSelectedOption(optionIndex);
  }

  return (
    <View>
      <Pressable onPress={() => setOptionsOpen(!optionsOpen)} style={styles.selectedOptionContainer}>
        <Text style={[styles.optionText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>{options[selectedOption]}</Text>
        <AntDesign name={optionsOpen ? "caretdown" : "caretleft"} size={22} color={colors.charcoal} />
      </Pressable>
      {optionsOpen && (
        <View style={[styles.otherOptionsContainer, {backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.extralightgray}]}>
        {Object.entries(options).map(([id, name], iterationIndex) => {
          if(id == selectedOption) {
            return;
          }
          return (
              <TouchableOpacity 
                key={id} 
                onPress={selectOptionHandler.bind(this, id)} 
                style={[styles.optionContainer, iterationIndex == Object.keys(options).length-1 && styles.lastOption]}
              >
                <Text style={[styles.optionText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>{name}</Text>
              </TouchableOpacity>
          );
        })}
        </View>
      )}
    </View>
  )
}

export default PickerInput

const styles = StyleSheet.create({
  selectedOptionContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  otherOptionsContainer: {
    paddingVertical: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  optionContainer: {
    paddingVertical: 10,
    paddingLeft: 15,
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 1
  },
  
  lastOption: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent'
  },

  optionText: {
    fontSize: 18,
  }
})