import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/Globalstyles'

const ShortExerciseInfo = ({item}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.nameText}>{item.name}</Text>
        <View style={styles.extraInfo}>
            <Text style={styles.muscleGroupText}>Chest</Text>
            <Text style={styles.pbText}>PB: 92 kg</Text>
        </View>
      </View>
      <Text>Add ex. to wrkout btn</Text>
    </View>
  )
}

export default ShortExerciseInfo

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    extraInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    nameText: {
        fontSize: 20,
    },

    muscleGroupText: {
        fontSize: 14,
        textTransform: 'uppercase',
        marginTop: 5,
        color: colors.gray
    },

    pbText: {
        fontSize: 14,
        textTransform: 'uppercase',
        marginTop: 5,
        marginLeft: 10,
        color: colors.gray
    }
})