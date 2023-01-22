import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";

// #023047

export default function FormTextInput({placeholder, value, onChangeText, icon, containerStyle, secureEntry, updateState}) {
    const activeTextColor = active ? "#FB8500" : "black";
    const [active, setActive] = useState(false);
    
    return (
        <View style={[
            styles.container, containerStyle && containerStyle, 
            active && styles.active,
            {borderBottomColor: value ? activeTextColor: "#ccc"}
        ]}>
            {icon && <Pressable style={styles.iconContainer} onPress={updateState}>
                <Feather name={icon} size={26} color={value ? activeTextColor : "#ccc"} />
            </Pressable>}
            <TextInput 
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, {color: activeTextColor}]}
                autoCapitalize={false}
                autoCorrect={false}
                secureTextEntry={secureEntry}
                onFocus={() => setActive(true)}
                onEndEditing={() => setActive(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20
    },

    active: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        borderRadius: 30,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {x: 0, y: 0}
    },

    iconContainer: {
        marginRight: 15
    },

    input: {
        flex: 1,
        fontSize: 22,
        color: "#FB8500",
    }
});