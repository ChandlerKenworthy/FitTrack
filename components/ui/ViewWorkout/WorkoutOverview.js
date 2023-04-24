import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../constants/Globalstyles';
import { muscleGroupIDtoString } from '../../../constants/lookup';
import { monthIndextoString } from '../../../constants/lookup';

const WorkoutOverview = ({workout, muscleGroups}) => {
    function getMuscleGroupsString() {
        let str = "";
        muscleGroups.map((el, i) => {
            str += muscleGroupIDtoString[el];
            str += ", ";
            if(i === muscleGroups.length - 1) {
                str = str.slice(0, -2);
            }
        });
        return str;
    }

    return (
        <View style={styles.headerInfoContainer}>
            <View style={styles.titleWrapper}>
                <View>
                    <Text style={styles.titleText}>{workout.name}</Text>
                    <Text style={styles.muscleGroupTitleText}>Muscle Groups</Text>
                    <Text style={styles.muscleGroupText}>{getMuscleGroupsString()}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateDayText}>{workout.day}</Text>
                    <Text style={styles.dateMonthText}>{monthIndextoString[workout.month-1].slice(0,3)}</Text>
                </View>
            </View>
            <View style={styles.overviewContainer}>
                <View style={styles.overview}>
                    <Text style={styles.overviewHighlightText}>{JSON.parse(workout.exercises).length}</Text>
                    <Text>Exercises</Text>
                </View>
                <View style={styles.overview}>
                    <Text style={styles.overviewHighlightText}>1h 15m</Text>
                    <Text>Duration</Text>
                </View>
                <View style={styles.overview}>
                    <Text style={styles.overviewHighlightText}>{workout.totalVolume} kg</Text>
                    <Text>Volume</Text>
                </View>
            </View>
        </View>
  )
}

export default WorkoutOverview

const styles = StyleSheet.create({
    headerInfoContainer: {
        backgroundColor: colors.white,
        marginHorizontal: 15,
        marginVertical: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20
    },

    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    titleText: {
        fontSize: 28,
        fontWeight: '700',
    },

    dateContainer: {
        backgroundColor: colors.lightorange,
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    dateDayText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 26,
    },

    dateMonthText: {
        color: colors.white,
        fontWeight: '300',
        textTransform: 'uppercase',
        fontSize: 16
    },

    muscleGroupTitleText: {
        fontSize: 14,
        color: colors.gray,
        marginTop: 15
    },

    muscleGroupText: {
        color: colors.charcoal,
        fontSize: 18,
        marginTop: 5
    },

    overviewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 0,
        backgroundColor: 'rgba(0,0,0,0.05)'
    },

    overview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    overviewHighlightText: {
        fontSize: 20,
        color: colors.lightorange,
        marginBottom: 5
    }
})