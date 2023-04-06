import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { muscleGroupIDtoString } from '../../constants/lookup'

const ExerciseSnippet = ({data, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress.bind(this, data.id)}>
      <Text style={styles.titleText}>{data.name}</Text>
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.muscleGroupText}>{muscleGroupIDtoString[data.muscleGroup_id]}</Text>
        <Text>PB: 88 kg</Text>
      </View>
    </Pressable>
  )
}

export default ExerciseSnippet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightgray,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },

    titleText: {
        fontSize: 18,
        fontWeight: '500'
    },

    additionalInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    muscleGroupText: {
        marginRight: 10,
        fontSize: 14,
        color: colors.charcoal
    }
})