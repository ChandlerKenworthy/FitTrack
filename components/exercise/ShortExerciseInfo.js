import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { AntDesign } from '@expo/vector-icons';
import { muscleGroupIDtoString } from '../../assets/lookup';

const ShortExerciseInfo = ({item, searchTerm}) => {
  const nameArr = item.name.split(""); // Split name into array of single chars
  const searchIndex = item.name.toLowerCase().indexOf(searchTerm.toLowerCase());
  const searchTermExists = searchTerm !== null && searchTerm !== undefined && searchTerm !== "";

  console.log(item);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textArrayContainer}>
          {searchTermExists && searchIndex !== -1 ? nameArr.map((name, index) => {
            const highlight = index >= searchIndex && index < (searchIndex + searchTerm.length);
            return (
              <Text 
                key={index} 
                style={[styles.nameText, highlight && styles.highlightText]}
              >
                {name}
              </Text>
            );
          }) : <Text style={styles.nameText}>{item.name}</Text>}
        </View>
        <View style={styles.extraInfo}>
            <Text style={styles.muscleGroupText}>{muscleGroupIDtoString[item.muscleGroup_id]}</Text>
            <Text style={styles.pbText}>PB: 92 kg</Text>
        </View>
      </View>
      <Pressable onPress={() => { console.log("TODO: Add this exercise to new/current workout"); }}>
        <AntDesign name="pluscircleo" size={32} color={colors.charcoal} />
      </Pressable>
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
    },

    textArrayContainer: {
      flexDirection: 'row',
      alignItems: 'baseline'
    },

    highlightText: {
      fontWeight: '700'
    }
})