import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { 
    DrawerContentScrollView,
    DrawerItemList 
} from '@react-navigation/drawer'
import { colors } from '../../constants/Globalstyles'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <DrawerContentScrollView 
                {...props}
                contentContainerStyle={styles.drawerContentContainer}   
            >
                <View style={styles.imageBackground}>
                    <Pressable style={styles.profileImageContainer} onPress={() => navigation.navigate('Profile')}>
                        <Image source={require('../../assets/images/profileStockPhoto.png')} style={styles.profileImage} />
                    </Pressable>
                    <Text style={styles.nameText}>Chandler Kenworthy</Text>
                    <View style={styles.nWorkoutContainer}>
                        <View style={styles.profileInfoContainer}>
                            <Text style={styles.nWorkoutText}>96</Text>
                            <MaterialCommunityIcons name="weight-lifter" size={26} color={colors.lightorange} />
                        </View>
                        <View style={[styles.profileInfoContainer, {marginLeft: 15}]}>
                            <Text style={styles.nWorkoutText}>732,461</Text>
                            <MaterialCommunityIcons name="weight-kilogram" size={26} color={colors.lightorange} />
                        </View>
                    </View>
                </View>
                <View style={styles.drawerItemListContainer}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.extraItemsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.rowPressable}>
                    <Ionicons name="settings-outline" color={colors.gray} size={26} />
                    <Text style={styles.pressableText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ReportBug')} style={styles.rowPressable}>
                    <FontAwesome5 name="bug" color={colors.gray} size={26} />
                    <Text style={styles.pressableText}>Report Bug</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },

    drawerContentContainer: {
        backgroundColor: colors.white
    },

    imageBackground: {
        padding: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray
    },

    profileImageContainer: {
        marginBottom: 15,
    },

    profileImage: {
        width: 80, 
        height: 80,
        borderRadius: 40,
    },

    nameText: {
        fontSize: 18,
        color: colors.charcoal,
        fontWeight: '700'
    },

    nWorkoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    nWorkoutText: {
        fontSize: 16,
        color: colors.lightorange,
        marginRight: 5
    },

    drawerItemListContainer: {
        backgroundColor: colors.white,
        paddingVertical: 20
    },

    extraItemsContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: colors.lightgray
    },

    rowPressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },

    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    pressableText: {
        fontSize: 16,
        color: colors.gray,
        marginLeft: 10,
        fontWeight: '500'
    }
})