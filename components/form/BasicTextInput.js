import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../../constants/Globalstyles';
import { useContext } from 'react';
import { SettingsContext } from '../../store/settings-context';

const BasicTextInput = ({value, onChangeText, placeholder, showBorder, style}) => {
  const settingsCtx = useContext(SettingsContext);

  return (
    <View>
      <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={"none"}
        style={
          [
            styles.input, 
            {color: settingsCtx.darkMode ? colors.white : colors.charcoal},
            showBorder == false && {borderBottomWidth: 0},
            style && style
          ]}
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