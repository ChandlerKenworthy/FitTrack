import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../../constants/Globalstyles';

const BasicTextInput = ({value, onChangeText, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={false}
        style={styles.input}
      />
    </View>
  )
}

export default BasicTextInput

const styles = StyleSheet.create({
    input: {
        color: colors.charcoal,
        paddingBottom: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray
    }
})