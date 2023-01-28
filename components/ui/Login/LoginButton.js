import { Text, Pressable, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginButton = ({text, onPress}) => {
    return (
        <LinearGradient 
            style={styles.gradientContainer} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
            colors={["#FB8500", "#FFB703"]}
        >
            <Pressable onPress={onPress} style={styles.container}>
                <Text style={styles.text}>{text ? text : "Login"}</Text>
                <AntDesign name="arrowright" size={24} color="white" />
            </Pressable>
        </LinearGradient>
    )
}

export default LoginButton;

const styles = StyleSheet.create({
    gradientContainer: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '45%',
    },

    container: {
        flexDirection: 'row',
        borderRadius: 30
    },

    text: {
        fontSize: 22,
        color: 'white',
        fontWeight: "500",
        marginRight: 5
    }
});