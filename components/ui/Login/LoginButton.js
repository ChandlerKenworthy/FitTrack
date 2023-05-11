import { Text, Pressable, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../constants/Globalstyles';

const LoginButton = ({text, onPress, iconName}) => {
    return (
        <LinearGradient 
            style={styles.gradientContainer} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
            colors={[colors.lightorange, "#709be0"]}
        >
            <Pressable onPress={onPress} style={styles.container}>
                <Text style={styles.text}>{text ? text : "Login"}</Text>
                <AntDesign name={iconName ? iconName : "arrowright"} size={24} color="white" />
            </Pressable>
        </LinearGradient>
    )
}

export default LoginButton;

const styles = StyleSheet.create({
    gradientContainer: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '45%',
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        minWidth: '45%',
    },

    text: {
        fontSize: 22,
        color: 'white',
        fontWeight: "500",
        marginRight: 5
    }
});