import { Pressable, StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { AntDesign } from '@expo/vector-icons';
import { muscleGroupIDtoString } from '../../constants/lookup';
import { Swipeable } from 'react-native-gesture-handler';
import { useRef } from 'react';
import { exerciseDB } from '../../database/localDB';
const deviceWidth = Dimensions.get('window').width;

/* ShortExerciseInfo 
 * A swipeable component to be rendered in a flat list. Shows exercise details such as name, personal best etc in a pill
 * shaped box. Has 3 swipeable buttons to toggle favorite, edit and delete exercise.
 * Parameters:
 * - item (obj): Object that represents an exercise from the exercise database (has name, id etc.)
 * - searchTerm (str): The value of any search term entered on the ExerciseList screen
 * - forceRefresh (fnc): Function to toggle state in ExerciseList screen triggering database to be refreshed
 * Author: Chandler Kenworthy (02/04/2023)
*/

const ShortExerciseInfo = ({item, searchTerm, forceRefresh, toggleModal}) => {
  // Split name into array of single chars
  const nameArr = item.name.split("");
  // Find the index of the first occurence of the search term in the exercise's name
  const searchIndex = item.name.toLowerCase().indexOf(searchTerm.toLowerCase());
  // Check if a search term is active
  const searchTermExists = searchTerm !== null && searchTerm !== undefined && searchTerm !== "";
  // Reference to swipeable component
  const swipeRef = useRef(null);

  function toggleIsFavorite() {
    exerciseDB.transaction(tx => {
      tx.executeSql(
        "UPDATE exercises SET isFavorite = (?) WHERE id = (?)",
        [item.isFavorite == 1 ? 0 : 1, item.id],
        (tx, resultSet) => { },
        (tx, error) => { console.log(`[Error in ShortExerciseInfo.js] (toggleIsFavorite) ${error}`) }
      );
    });
    // Close the current swipeable object
    swipeRef.current.close();
    // Force update state to re-fetch updated data from DB
    forceRefresh(prevRefresh => !prevRefresh);
  }

  function deleteExercise() {
    exerciseDB.transaction(tx => {
      tx.executeSql(
        "DELETE FROM exercises WHERE id = (?)",
        [item.id],
        (tx, resultSet) => { },
        (tx, error) => { console.log(`[Error in ShortExerciseInfo.js] (deleteExercise) ${error}`) }
      );
    });
    forceRefresh(prevRefresh => !prevRefresh);
  }

  function editExerciseHandler() {
    // Close the current swipeable object
    swipeRef.current.close();
    // Open modal
    toggleModal({isOpen: true, data: item});
  }

  function renderRightActionButtons() {
    return (
      <View style={styles.rightActionsContainer}>
        <Pressable 
          style={[styles.swipedButtonContainer, {backgroundColor: colors.success}]}
          onPress={toggleIsFavorite}
        >
          <AntDesign name={item.isFavorite == 1 ? "star" : "staro"} size={24} color={colors.white} />
        </Pressable>
        <Pressable 
          style={[styles.swipedButtonContainer, {backgroundColor: 'orange'}]}
          onPress={editExerciseHandler}
        >
          <AntDesign name="edit" size={24} color={colors.white} />
        </Pressable>
        <Pressable 
          style={[styles.swipedButtonContainer, {backgroundColor: colors.failure, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}
          onPress={deleteExercise}
        >
          <AntDesign name="delete" size={24} color={colors.white} />
        </Pressable>
      </View>
    );
  }

  const borderRadiusAnim = useRef(new Animated.Value(20)).current;

  const shrinkBorderRadius = () => {
    // Will change borderRadiusAnim value to 1 in 2 seconds
    Animated.timing(borderRadiusAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const increaseBorderRadius = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(borderRadiusAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActionButtons}
      friction={2}
      onSwipeableWillOpen={() => shrinkBorderRadius()}
      onSwipeableWillClose={() => increaseBorderRadius()}
      rightThreshold={0.1 * deviceWidth}
      overshootRight={false}
    >
      <Animated.View style={[styles.container, {borderTopRightRadius: borderRadiusAnim, borderBottomRightRadius: borderRadiusAnim, borderBottomLeftRadius: 20, borderTopLeftRadius: 20}]}>
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
      </Animated.View>
    </Swipeable>
  )
}

export default ShortExerciseInfo

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 5,
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
    },

    rightActionsContainer: {
      marginVertical: 5,
      flexDirection: 'row',
    },

    swipedButtonContainer: {
      height: '100%', 
      justifyContent: 'center',
      alignItems: 'center',
      width: 0.5 * 0.33 * deviceWidth
    },
})