import { useEffect, useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View, Easing } from 'react-native'
import { exerciseDB } from '../../../database/localDB'
import { colors } from '../../../constants/Globalstyles';
import { AntDesign } from '@expo/vector-icons';
import { SlideInDown, Layout, color } from 'react-native-reanimated';

const WorkoutExerciseItem = ({exerciseId, weights, reps, style}) => {
    const [exInfo, setExInfo] = useState(null);
    const [showDetails, setShowDetails] = useState(true);
    const caretRotationAnim = useRef(new Animated.Value(0)).current;
    const caretRotation = caretRotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const animatedStyles = {
        transform: [{rotate: caretRotation}]
    };

    useEffect(() => {
        exerciseDB.transaction(tx => {
            tx.executeSql(
                "SELECT name, personalBest FROM exercises WHERE id = (?)",
                [exerciseId],
                (tx, result) => setExInfo(result.rows._array[0]),
                (tx, error) => console.warn(`[Error: WorkoutExerciseItem.js] ${error}`)
            );
        });
    }, [exerciseId]);

    if(!exInfo) {
        return (
            <View>
                <Text>Loading exercise information...</Text>
            </View>
        );
    }

    function handleToggleDetails() {
        Animated.spring(
            caretRotationAnim, {
            toValue: showDetails ? 1 : 0,
            duration: 200,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true  // To make use of native driver for performance
            }
        ).start();
        setShowDetails(!showDetails);
    }

    return (
        <View style={style && style}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeftContainer}>
                    <View style={styles.repsContainer}>
                        <Text style={styles.repsText}>{weights.length}</Text>
                        <Text style={styles.repsSmallText}>Sets</Text>
                    </View>
                    <Text style={styles.exerciseNameText}>{exInfo.name}</Text>
                </View>
                <Animated.View style={[styles.showDetailsBtn, animatedStyles]}>
                    <Pressable style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={handleToggleDetails}>
                        <AntDesign name={"up"} size={20} color={colors.white} />
                    </Pressable>
                </Animated.View>
            </View>
            {showDetails && (
                <Animated.View entering={SlideInDown.duration(3000)} layout={Layout.springify()}>
                    {weights.map((weight, index) => {
                        return (
                            <View key={index} style={[styles.headerContainer, {marginBottom: 7}]}>
                                <View style={styles.headerLeftContainer}>
                                    <View style={styles.setCircle}>
                                        <Text style={styles.setText}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.setInfoContainer}>
                                        <Text style={styles.textHighlight}>{reps[index]}</Text>
                                        <Text style={[styles.textLowlight, {marginHorizontal: 1}]}>x</Text>
                                        <Text style={styles.textHighlight}>{weight}</Text>
                                        <Text style={[styles.textLowlight, {marginLeft: 3}]}>kg</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                                    <Text style={[styles.textLowlight, {marginRight: 3}]}>1RM</Text>
                                    <Text style={styles.textHighlight}>{exInfo.personalBest ? exInfo.personalBest : "N/A"}</Text>
                                    <Text style={[styles.textLowlight, {marginLeft: 3}]}>kg</Text>
                                </View>
                            </View>
                        );
                    })}
                </Animated.View>
            )}
        </View>
    )
}

export default WorkoutExerciseItem

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    headerLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    repsContainer: {
        backgroundColor: colors.lightorange,
        width: 46,
        height: 46,
        borderRadius: 23,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    repsText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 20
    },

    repsSmallText: {
        color: colors.white,
        fontWeight: '300',
        fontSize: 12,
        marginTop: -3
    },

    exerciseNameText: {
        fontSize: 18,
        color: colors.charcoal,
        fontWeight: '500'
    },

    showDetailsBtn: {
        backgroundColor: colors.lightorange,
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },

    setCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: 30,
        height: 30,
        borderRadius: '50%',
        marginLeft: 6.5,
    },

    setText: {
        color: colors.charcoal,
        fontSize: 14
    },

    setInfoContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'baseline'
    },

    textHighlight: {
        color: colors.lightorange,
        fontSize: 20,
        fontWeight: '500',
    },

    textLowlight: {
        color: colors.gray,
        fontSize: 14
    }
})