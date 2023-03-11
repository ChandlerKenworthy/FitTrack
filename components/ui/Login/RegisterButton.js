import { Text, Pressable, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterButton = ({children, onPress}) => {
    return (
        <LinearGradient 
            style={styles.gradientContainer} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
            colors={["#FB8500", "#FFB703"]}
        >
            <Pressable onPress={onPress} style={styles.container}>
                <Text style={styles.text}>Register</Text>
                <AntDesign name="arrowright" size={24} color="#FB8500" />
            </Pressable>
        </LinearGradient>
    )
}

export default RegisterButton;

const styles = StyleSheet.create({
    gradientContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '45%',
    },

    container: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        borderRadius: 30
    },

    text: {
        fontSize: 22,
        color: "#FB8500",
        fontWeight: "500",
        marginRight: 5
    }
});