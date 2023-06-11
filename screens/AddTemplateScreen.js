import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { EmptyWorkoutTemplate } from '../state/EmptyState'
import RippleButton from '../components/ui/Buttons/RippleButton'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../constants/Globalstyles'
import PickExerciseModal from '../components/form/PickExerciseModal'
import uuid from 'react-native-uuid'
import TemplateExerciseItem from '../components/templates/TemplateExerciseItem'

const AddTemplateScreen = () => {
    const [template, setTemplate] = useState(EmptyWorkoutTemplate);
    const [modelOpen, setModalOpen] = useState(false);

    const AddExerciseHandler = (id) => { // id of exericse pressed
        setTemplate((prevTemplate) => {
            return {
                ...prevTemplate,
                exercises: [...prevTemplate.exercises, id],
                reps: [...prevTemplate.reps, [null]],
            };
        });
        setModalOpen(false);
    }

    const DeleteSetHandler = (exerciseIndex, setIndex) => {
        setTemplate(currTemplate => {
            return {
                ...currTemplate,
                reps: currTemplate.reps.map((repsArr, exIdx) => {
                    if(exIdx !== exerciseIndex) {
                        return repsArr;
                    } else {
                        return repsArr.filter((el, setIdx) => setIdx !== setIndex);
                    }
                })
            };
        });
    }

    const AddSetHandler = (exerciseIndex) => {
        setTemplate(currTemplate => {
            return {
                ...currTemplate,
                reps: currTemplate.reps.map((repArr, index) => {
                    if(index === exerciseIndex) {
                        return [...repArr, null];
                    } else {
                        return repArr;
                    }
                })
            };
        })
    }

    const DeleteExerciseHandler = (exerciseIndex) => {
        setTemplate(currTemplate => {
            return {
                ...currTemplate,
                exercises: currTemplate.exercises.filter((el, index) => index !== exerciseIndex),
                reps: currTemplate.reps.filter((el, index) => index !== exerciseIndex),
            };
        });
    }

    const UpdateRepsHandler = (exerciseIndex, repIndex, newReps) => {
        console.log("Called with payload = ", exerciseIndex, repIndex, newReps);
        setTemplate(currTemplate => {
            return {
                ...currTemplate,
                reps: currTemplate.reps.map((repArr, index) => {
                    if(index === exerciseIndex) {
                        return repArr.map((rep, repIdx) => {
                            if(repIdx === repIndex) {
                                return parseInt(newReps);
                            } else {
                                return rep;
                            }
                        });
                    } else {
                        return repArr;
                    }
                })
            };
        });
    }

    useEffect(() => {
        console.log(template)
    }, [template]);

    return (
        <View style={{flex: 1}}>
            <PickExerciseModal open={modelOpen} setOpen={setModalOpen} selectExerciseHandler={AddExerciseHandler} />
            {template.exercises.length === 0 && (
                <View style={styles.noTemplateContainer}><Text style={styles.noTemplateText}>Template Empty</Text></View>
            )}
            {template.exercises.length !== 0 &&
                <FlatList 
                    ref={exerciseListRef}
                    data={template.exercises}
                    keyExtractor={() => uuid.v4()}
                    renderItem={({item, index}) => (
                        <TemplateExerciseItem 
                            exerciseID={item}
                            index={index}
                            reps={template.reps[index]}
                            addSet={() => AddSetHandler(index)}
                            deleteSet={DeleteSetHandler}
                            onDeleteExercise={DeleteExerciseHandler}
                            updateRepsHandler={UpdateRepsHandler}
                        />
                    )}
                />
            }
            <View style={styles.addExerciseBtnContainer}>
                <RippleButton
                    style={styles.rippleBtn}
                    onTap={() => setModalOpen(true)}
                >
                    <AntDesign name="plus" size={55} color={colors.lightorange} />
                </RippleButton>
            </View>
            <View style={styles.submitTemplateBtnContainer}>
                <RippleButton
                    style={styles.rippleBtn}
                    onTap={() => console.log("Save template")}
                >
                    <AntDesign name="check" size={55} color={colors.lightorange} />
                </RippleButton>
            </View>
        </View>
    )
}

export default AddTemplateScreen

const styles = StyleSheet.create({
    noTemplateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    noTemplateText: {
        fontSize: 32,
        fontWeight: '300',
        color: colors.lightgray
    },

    addExerciseBtnContainer: {
        position: 'absolute',
        left: 15,
        bottom: 30,
    },

    submitTemplateBtnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 30,
    },

    rippleBtn: {
        borderRadius: '50%',
        width: 90,
        height: 90,
        backgroundColor: colors.white,
        elevation: 5,
        shadowRadius: 5,
        shadowOffset: {x: 0, y: 0},
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})