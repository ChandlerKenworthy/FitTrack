import { Pressable, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const CircleIconButton = ({icon, onPress, size, color, scale}) => {
    const width = 100 * scale;
    const height = width;
    const borderRadius = width / 2;
    const sizeStyles = {
        width: width,
        height: height,
        borderRadius: borderRadius
    };

    return (
        <Pressable onPress={onPress} style={[styles.container, sizeStyles]}>
            <AntDesign name={icon} size={size ? size : 24} color={color ? color : "black"} />
        </Pressable>
    )
}

export default CircleIconButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "black",
        shadowRadius: 6,
        shadowOpacity: 0.2,
        shadowOffset: {x: 0, y: 0}
    }
})