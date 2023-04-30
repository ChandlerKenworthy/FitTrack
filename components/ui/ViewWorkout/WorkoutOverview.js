import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../constants/Globalstyles';
import { GetPoundsFromKilo, muscleGroupIDtoString } from '../../../constants/lookup';
import { monthIndextoString } from '../../../constants/lookup';
import { useContext } from 'react';
import { SettingsContext } from '../../../store/settings-context';

const WorkoutOverview = ({workout, muscleGroups}) => {
    const settingsCtx = useContext(SettingsContext);
    const bgColor = settingsCtx.darkMode ? colors.extralightblack : colors.white;
    const textColor = settingsCtx.darkMode ? colors.white : colors.charcoal;

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
        <View style={[styles.headerInfoContainer, {backgroundColor: bgColor}]}>
            <View style={styles.titleWrapper}>
                <View>
                    <Text style={[styles.titleText, {color: textColor}]}>{workout.name}</Text>
                    <Text style={styles.muscleGroupTitleText}>Muscle Groups</Text>
                    <Text style={[styles.muscleGroupText, {color: textColor}]}>{getMuscleGroupsString()}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateDayText}>{workout.day}</Text>
                    <Text style={styles.dateMonthText}>{monthIndextoString[workout.month-1].slice(0,3)}</Text>
                </View>
            </View>
            <View style={[styles.overviewContainer, {backgroundColor: settingsCtx.darkMode ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.05)'}]}>
                <View style={styles.overview}>
                    <Text style={styles.overviewHighlightText}>{JSON.parse(workout.exercises).length}</Text>
                    <Text style={{color: textColor}}>Exercises</Text>
                </View>
                <View style={styles.overview}>
                    <Text style={styles.overviewHighlightText}>1h 15m</Text>
                    <Text style={{color: textColor}}>Duration</Text>
                </View>
                <View style={styles.overview}>
                    <Text 
                        style={styles.overviewHighlightText}
                    >
                        {Math.round(settingsCtx.metricUnits ? workout.totalVolume : GetPoundsFromKilo(workout.totalVolume))} {settingsCtx.metricUnits ? "kg" : "lb"}
                    </Text>
                    <Text style={{color: textColor}}>Volume</Text>
                </View>
            </View>
        </View>
  )
}

export default WorkoutOverview

const styles = StyleSheet.create({
    headerInfoContainer: {
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