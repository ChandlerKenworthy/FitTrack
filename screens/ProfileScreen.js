import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useUserAuth } from '../store/UserAuthContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../constants/Globalstyles';

const ProfileScreen = () => {
    const { user, logOut } = useUserAuth();

  return (
    <SafeAreaView style={styles.root}>
        <ScrollView style={styles.root} contentContainerStyle={{alignItems: 'center'}}>
            <View style={[styles.root, {alignItems: 'center'}]}>
                <View style={styles.profileImageContainer}>
                    <Image style={styles.profileImage} source={require("../assets/images/profileStockPhoto.png")} />
                </View>
                <View style={styles.profileDataContainer}>
                    <Text style={styles.profileName}>Arnold</Text>
                    <View style={styles.profileStats}>
                        <View style={styles.profileStatBox}>
                            <FontAwesome5 name="weight-hanging" size={35} color={colors.lightorange} />
                            <Text style={styles.profileStatText}>13,770 kg</Text>
                        </View>
                        <View style={styles.profileStatBox}>
                            <FontAwesome5 name="fire-alt" size={35} color={colors.lightorange} />
                            <Text style={styles.profileStatText}>187</Text>
                        </View>
                        <View style={styles.profileStatBox}>
                            <MaterialCommunityIcons name="scale-bathroom" size={35} color={colors.lightorange} />
                            <Text style={styles.profileStatText}>83.4 kg</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.signOutContainer}>
                    <Pressable style={styles.signOutBtn} onPress={logOut}>
                        <AntDesign name="arrowright" size={24} color={colors.lightorange} />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    profileImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 5}
    },

    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 75
    },

    profileDataContainer: {
        marginTop: 20,
        alignItems: 'center'
    },

    profileName: {
        fontSize: 36,
        fontWeight: '700'
    },

    profileStats: {
        marginTop: 30,
        flexDirection: 'row',
        
    },

    profileStatBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 25
    },

    profileStatText: {
        fontSize: 20,
        fontWeight: '300',
        marginTop: 8,
        textAlign: 'center'
    },

    signOutBtn: {
        flexDirection: 'row'
    },

    signOutText: {
        color: "#FB8500",
        fontSize: 18,
        marginLeft: 10
    }
})