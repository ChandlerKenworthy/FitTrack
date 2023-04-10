import { Animated } from "react-native";

export const shrinkBorderRadius = (animatedValue, duration) => {
    Animated.timing(animatedValue, {
    toValue: 0,
    duration: duration,
    useNativeDriver: true,
    }).start();
};

export const increaseBorderRadius = (animatedValue, duration) => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(animatedValue, {
    toValue: 20,
    duration: duration,
    useNativeDriver: true,
    }).start();
};