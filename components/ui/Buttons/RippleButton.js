import { View } from 'react-native'
import React, { useMemo } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { measure, runOnJS, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const RippleButton = ({style, onTap, children}) => {
    const centreX = useSharedValue(0);
    const centreY = useSharedValue(0);
    const scale = useSharedValue(0);

    const aRef = useAnimatedRef();
    const width = useSharedValue(0);
    const height = useSharedValue(0);

    const rippleOpacity = useSharedValue(1);

    const tapGestureEvent = useMemo(
        () =>
            Gesture.Tap().onBegin((tapEvent) => {
                const layout = measure(aRef);
                width.value = layout.width;
                height.value = layout.height;
                centreX.value = tapEvent.x;
                centreY.value = tapEvent.y;
                rippleOpacity.value = 1;
                scale.value = 0;
                scale.value = withTiming(1, { duration: 700 });
            }).onStart(() => {
                runOnJS(onTap)();
            }).onFinalize(() => {
                rippleOpacity.value = withTiming(0, { duration: 700 });
            }),
    );

    const rStyle = useAnimatedStyle(() => {
        const circleRadius = Math.sqrt(width.value**2 + height.value**2);
        const translateX = centreX.value - circleRadius;
        const translateY = centreY.value - circleRadius;

        return {
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            opacity: rippleOpacity.value,
            backgroundColor: 'rgba(52,120,198,0.2)',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: [
                { translateX },
                { translateY },
                {
                    scale: scale.value
                }
            ]
        };
    });

    return (
        <View ref={aRef} style={style}>
            <GestureDetector gesture={tapGestureEvent}>
                <Animated.View style={[style, { overflow: 'hidden' }]}>
                    <View>{children}</View>
                    <Animated.View style={rStyle} />
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

export default RippleButton