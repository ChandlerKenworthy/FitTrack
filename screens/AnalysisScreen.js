import { ScrollView, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import WorkoutDayFrequency from '../components/graphs/WorkoutDayFrequency'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AnalysisScreen = () => {
  function GraphComponent() {
    return (
      <View style={styles.frequencyWorkoutGraphContainer}>
        <WorkoutDayFrequency />
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1}}>
      <FlatList
        data={[1, 2, 3]}
        style={{ flex: 1 }}
        renderItem={(item) => GraphComponent()}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text style={{marginTop: 15}}>Some carousel buttons go here...</Text>
    </ScrollView>
  )
}

export default AnalysisScreen

const styles = StyleSheet.create({
  frequencyWorkoutGraphContainer: {
    width: windowWidth,
    paddingHorizontal: 15,
    marginVertical: 15,
    alignItems: 'center',
  },

  dummy: {
    width: windowWidth,
    height: 250,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'green'
  }  
})