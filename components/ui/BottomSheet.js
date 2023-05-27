import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useImperativeHandle } from 'react';
import { colors } from '../../constants/Globalstyles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useCallback } from 'react';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = React.forwardRef(({children}, ref) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination) => {
        "worklet";
        active.value = destination !== 0;
        translateY.value = withSpring(destination, { damping: 50 })
    });

    const isActive = useCallback(() => {
        return active.value;
    }); 

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    const panGesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd((event) => {
        if(translateY.value > -SCREEN_HEIGHT / 3) {
            scrollTo(0);
        } else if(translateY.value < -SCREEN_HEIGHT / 1.5) {
            scrollTo(MAX_TRANSLATE_Y);
        }
    });

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value, 
            [MAX_TRANSLATE_Y+100, MAX_TRANSLATE_Y], 
            [25, 5],
            Extrapolate.CLAMP
        );
        return {
            borderRadius,
            transform: [{translateY: translateY.value}]
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line}></View>
                {children}
            </Animated.View>
        </GestureDetector>
    )
});

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
    },

    line: {
        width: 75,
        height: 4,
        backgroundColor: colors.lightgray,
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    }
})