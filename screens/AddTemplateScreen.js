import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState, useCallback } from 'react'
import { EmptyWorkoutTemplate } from '../state/EmptyState'
import RippleButton from '../components/ui/Buttons/RippleButton'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../constants/Globalstyles'
import BottomSheet from '../components/ui/BottomSheet'

const AddTemplateScreen = () => {
    const [template, setTemplate] = useState(EmptyWorkoutTemplate);
    const bottomRef = useRef(null);
    const onToggleBottomDrawer = useCallback(() => {
        const isActive = bottomRef?.current?.isActive();
        if(isActive) {
            bottomRef?.current?.scrollTo(0);
        } else {
            bottomRef?.current?.scrollTo(-400);
        }
      }, []);

    return (
        <View style={{flex: 1}}>
            <Text>{JSON.stringify(template)}</Text>
            {template.exercises.length === 0 && (
                <View style={styles.noTemplateContainer}><Text style={styles.noTemplateText}>Template Empty</Text></View>
            )}
            {template.exercises.length !== 0 && (
                // Render each of the exercises in some sort of snippet box
                template.exercises.map((id, el) => {
                    return (
                        <Text>Exercise with id {id}</Text>
                    );
                })
            )}
            <BottomSheet ref={bottomRef}>
                <Text>Exercises go here?</Text>
            </BottomSheet>
            <View style={styles.addExerciseBtnContainer}>
                <RippleButton
                    style={styles.rippleBtn}
                    onTap={onToggleBottomDrawer}
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