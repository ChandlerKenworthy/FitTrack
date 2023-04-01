import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../../constants/Globalstyles';
import { useContext } from 'react';
import { SettingsContext } from '../../store/settings-context';

const BasicTextInput = ({value, onChangeText, placeholder}) => {
  const settingsCtx = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={false}
        style={[styles.input, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}
      />
    </View>
  )
}

export default BasicTextInput

const styles = StyleSheet.create({
    input: {
        paddingBottom: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray
    }
})