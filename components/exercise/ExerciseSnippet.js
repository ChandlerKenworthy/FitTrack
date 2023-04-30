import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { GetPoundsFromKilo, muscleGroupIDtoString } from '../../constants/lookup'
import { useContext } from 'react'
import { SettingsContext } from '../../store/settings-context'

const ExerciseSnippet = ({data, onPress}) => {
  const settingsCtx = useContext(SettingsContext);

  function GetPersonalBest() {
    if(data.personalBest) {
      return settingsCtx.metricUnits ? data.personalBest : Math.round(GetPoundsFromKilo(data.personalBest));
    } else {
      return "N/A";
    }
  }

  return (
    <Pressable style={styles.container} onPress={onPress.bind(this, data.id)}>
      <Text style={styles.titleText}>{data.name}</Text>
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.muscleGroupText}>{muscleGroupIDtoString[data.muscleGroup_id]}</Text>
        <Text>1RM: {GetPersonalBest()} {data.personalBest ? (settingsCtx.metricUnits ? "kg" : "lbs") : ""}</Text>
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