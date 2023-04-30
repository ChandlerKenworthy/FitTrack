import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { 
    DrawerContentScrollView,
    DrawerItemList 
} from '@react-navigation/drawer'
import { colors } from '../../constants/Globalstyles'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../store/settings-context';
import { workoutDB } from '../../database/localDB';
import { useDrawerStatus } from '@react-navigation/drawer';
import { GetPoundsFromKilo } from '../../constants/lookup';

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    const settingsCtx = useContext(SettingsContext);
    const [nWorkouts, setNWorkouts] = useState(null);
    const [totalVolume, setTotalVolume] = useState(null);
    const drawerStatus = useDrawerStatus();

    useEffect(() => {
        workoutDB.transaction(tx => {
            tx.executeSql(
                "SELECT COUNT(*) FROM workouts",
                null,
                (tx, result) => setNWorkouts(result.rows._array[0]["COUNT(*)"]),
                (tx, error) => console.warn(`[Error in CustomDrawer] ${error}`)
            );
            tx.executeSql(
                "SELECT SUM(totalVolume) FROM workouts",
                null,
                (tx, result) => setTotalVolume(Object.values(result.rows._array[0])[0]),
                (tx, error) => console.warn(`[Error in CustomDrawer] ${error}`)
            );
        });
    }, [drawerStatus]);

    return (
        <View style={[styles.root, {backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.white}]}>
            <DrawerContentScrollView 
                {...props}
                contentContainerStyle={{backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.white}}   
            >
                <View style={[styles.imageBackground, {backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.white}]}>
                    <Pressable style={styles.profileImageContainer} onPress={() => navigation.navigate('Profile')}>
                        <Image source={require('../../assets/images/profileStockPhoto.png')} style={styles.profileImage} />
                    </Pressable>
                    <Text style={[styles.nameText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>Chandler Kenworthy</Text>
                    <View style={styles.nWorkoutContainer}>
                        <View style={styles.profileInfoContainer}>
                            <Text style={styles.nWorkoutText}>{nWorkouts}</Text>
                            <MaterialCommunityIcons name="weight-lifter" size={26} color={colors.lightorange} />
                        </View>
                        <View style={[styles.profileInfoContainer, {marginLeft: 15}]}>
                            <Text style={styles.nWorkoutText}>{totalVolume ? (settingsCtx.metricUnits ? Math.round(totalVolume) : Math.round(GetPoundsFromKilo(totalVolume))) : "0"}</Text>
                            <MaterialCommunityIcons name={settingsCtx.metricUnits ? "weight-kilogram" : "weight-pound"} size={26} color={colors.lightorange} />
                        </View>
                    </View>
                </View>
                <View style={[styles.drawerItemListContainer, {backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.white}]}>
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
    },

    imageBackground: {
        padding: 20,
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