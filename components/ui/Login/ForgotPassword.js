import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ForgotPassword({containerStyle, children, onPress}) {
    return (
        <Pressable onPress={onPress} style={containerStyle && containerStyle}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "#FB8500",
        fontSize: 18,
    }
});