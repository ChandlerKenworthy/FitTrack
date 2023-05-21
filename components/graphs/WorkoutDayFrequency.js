import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/Globalstyles';
import { useEffect, useState } from 'react'
import { workoutDB } from '../../database/localDB';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { StandardTimeStamps } from '../../constants/lookup';
import GestureRecognizer from 'react-native-swipe-gestures';
import uuid from 'react-native-uuid';

const maxBarHeight = 150;
const minBarHeight = 20;
const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const nAxisTicks = 5;

const WorkoutDayFrequency = () => {
    const [viewMode, setViewMode] = useState(0); // 0 = last month, 1 = last 3 months, 2 = last 6 months, 3 = last year
    const [frequencies, setFrequencies] = useState([]);
    const [changeNumWrkts, setChangeNumWrkts] = useState(null);
    const isFocused = useIsFocused();
    const today = new Date();

    const totalFrequency = frequencies.reduce((partialSum, a) => partialSum + a, 0);
    const normFreqs = frequencies.map(f => f / totalFrequency);
    const dTicks = Math.ceil(100 * (Math.max(...normFreqs) - Math.min(...normFreqs)) / nAxisTicks);

    useEffect(() => {
        const nMonthsPrior = (viewMode === 0 ? 1 : (viewMode === 1 ? 3 : (viewMode === 2 ? 6 : 12))) * 2;
        let firstDate = new Date(today);
        firstDate.setMonth(firstDate.getMonth() - nMonthsPrior); // calculate earliest a workout could be
        let sqlQuery = "";

        if(firstDate.getFullYear() === today.getFullYear()) {
            // Remaining in the same year, query is a 'simple' one
            sqlQuery = `SELECT COUNT(*) FROM workouts WHERE year = ${firstDate.getFullYear()} AND ((month > ${firstDate.getMonth()+1}) OR (month = ${firstDate.getMonth()+1} AND day >= ${firstDate.getDate()}))`;
        } else {
            // Going back a year, select everything in current year plus a strict query like above
            sqlQuery = `SELECT COUNT(*) FROM workouts WHERE year = ${today.getFullYear()} OR (year = ${firstDate.getFullYear()} AND ((month > ${firstDate.getMonth()+1}) OR (month = ${firstDate.getMonth()+1} AND day >= ${firstDate.getDate()})))`;
        }

        workoutDB.transaction(tx => {
            tx.executeSql(
                sqlQuery,
                null,
                (tx, result) => {
                    setChangeNumWrkts(Object.values(result.rows._array[0])[0] - totalFrequency);
                },
                (tx, error) => console.warn(`[Error in WorkoutDayFrequency.js] ${error}`)
            )
        });
    }, [frequencies]);

    useEffect(() => {
        const nMonthsPrior = viewMode === 0 ? 1 : (viewMode === 1 ? 3 : (viewMode === 2 ? 6 : 12));
        let firstDate = new Date(today);
        firstDate.setMonth(firstDate.getMonth() - nMonthsPrior); // calculate earliest a workout could be
        let sqlQuery = "";

        if(firstDate.getFullYear() === today.getFullYear()) {
            // Remaining in the same year, query is a 'simple' one
            sqlQuery = `SELECT year, month, day FROM workouts WHERE year = ${firstDate.getFullYear()} AND ((month > ${firstDate.getMonth()+1}) OR (month = ${firstDate.getMonth()+1} AND day >= ${firstDate.getDate()}))`;
        } else {
            // Going back a year, select everything in current year plus a strict query like above
            sqlQuery = `SELECT year, month, day FROM workouts WHERE year = ${today.getFullYear()} OR (year = ${firstDate.getFullYear()} AND ((month > ${firstDate.getMonth()+1}) OR (month = ${firstDate.getMonth()+1} AND day >= ${firstDate.getDate()})))`;
        }

        workoutDB.transaction(tx => {
            tx.executeSql(
                sqlQuery,
                null,
                (tx, result) => {
                    let freqArr = [0, 0, 0, 0, 0, 0, 0];
                    for(let i = 0; i < result.rows._array.length; i++) {
                        const item = result.rows._array[i];
                        const workoutDate = new Date(item["year"], item["month"]-1, item["day"]);
                        const dayIndex = workoutDate.getDay() - 1 < 0 ? 6 : workoutDate.getDay() - 1;
                        freqArr[dayIndex] += 1;
                    }
                    setFrequencies(freqArr);
                },
                (tx, error) => console.warn(`[Error in WorkoutDayFrequency.js] ${error}`)
            )
        });
    }, [viewMode, isFocused]);

    function GetScaledHeight(i) {
        // Scales normalised frequency to range [minBarHeight, maxBarHeight]
        return (((normFreqs[i] - Math.min(...normFreqs))/(Math.max(...normFreqs)-Math.min(...normFreqs)))*(maxBarHeight - minBarHeight))+minBarHeight;
    }

    return (
        <View style={styles.parent}>
            <GestureRecognizer
                style={styles.switchDurationContainer}
                onSwipeLeft={() => {if(viewMode < 3) { setViewMode(viewMode + 1) }}}
                onSwipeRight={() => {if(viewMode > 0) { setViewMode(viewMode - 1) }}}
            >
                <Text style={styles.graphLabel}>Last {StandardTimeStamps[viewMode]}</Text>
                <Text 
                    style={[styles.lastTimePeriodText, {color: changeNumWrkts >= 0 ? colors.success : colors.failure}]}
                >({changeNumWrkts >= 0 ? `+${changeNumWrkts}` : changeNumWrkts})</Text>
            </GestureRecognizer>
            {frequencies.length > 0 && (
            <View style={styles.root}>
                <View style={styles.yaxis}>
                    {Array.from(Array(nAxisTicks)).map((el, i) => {
                        return (
                            <View key={i} style={styles.axisTickWrapper}>
                                <Text style={styles.axisLabelText}>{`${dTicks*(nAxisTicks-i)}%`}</Text>
                                <View style={styles.axistick}></View>
                            </View>
                        );
                    })}
                </View>
                {daysOfWeek.map((day, i) => {
                    return (
                        <View key={uuid.v4()} style={styles.barContainer}>
                            <LinearGradient 
                                style={[styles.verticalBar,  {height: GetScaledHeight(i)}]}
                                start={{x: 0, y: 1}} 
                                end={{x: 0, y: 0}}
                                colors={[colors.lightorange, "#709be0"]}
                            >
                            </LinearGradient>
                            <Text style={styles.text}>{day}</Text>
                        </View>
                    );
                })}
            </View>)}
        </View>
    )
}

export default WorkoutDayFrequency

const styles = StyleSheet.create({
    parent: {
        alignItems: 'center'
    },

    root: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    barContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
    },

    verticalBar: {
        width: 20,
        marginBottom: 8,
        backgroundColor: colors.charcoal,
        borderRadius: 20
    },

    text: {
        color: colors.gray
    },

    yaxis: {
        height: maxBarHeight,
        justifyContent: 'space-between',
        borderRightColor: colors.gray,
        borderRightWidth: 1,
        marginBottom: 24,
        marginRight: 10,
    },

    axisTickWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    axistick: {
        width: 6,
        height: 1,
        backgroundColor: colors.gray
    },

    axisLabelText: {
        color: colors.gray,
        fontSize: 10,
        marginRight: 3,
    },

    switchDurationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    lastTimePeriodText: {
        fontSize: 18,
        marginLeft: 7,
    },

    graphLabel: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.charcoal,
        textAlign: 'center',
      }
})