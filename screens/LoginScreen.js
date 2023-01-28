import { SafeAreaView, StyleSheet, View, Text, Modal, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useUserAuth } from "../UserAuthContext";
import LoginButton from '../components/ui/Login/LoginButton';
import RegisterButton from '../components/ui/Login/RegisterButton';
import FormTextInput from '../components/form/FormTextInput';
import ForgotPassword from '../components/ui/Login/ForgotPassword';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signUp, logIn, resetPassword } = useUserAuth();
    const [resetEmail, setResetEmail] = useState("");
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    async function signUpHandler(e) {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
        } catch (error) {
            setError(error.code); // error.message also works but they are a bit verbose
        }
    }

    async function logInHandler(e) {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            NavigationPreloadManager.navigate("Home");
        } catch (error) {
            setError(error.code);
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome to,</Text>
                    <Text style={styles.subTitle}>FitTrack</Text>
                </View>
                <View style={styles.inputContainer}>
                    <FormTextInput 
                        placeholder={"Email"} 
                        value={email} 
                        onChangeText={(text) => setEmail(text)} 
                        icon="mail"
                        containerStyle={{marginVertical: 15}}
                    />
                    <FormTextInput 
                        placeholder={"Password"} 
                        value={password} 
                        onChangeText={(text) => setPassword(text)} 
                        icon={passwordHidden ? "lock" : "unlock"}
                        containerStyle={{marginVertical: 15}}
                        secureEntry={passwordHidden}
                        updateState={() => setPasswordHidden((current) => !current)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <LoginButton onPress={logInHandler} />
                    <RegisterButton onPress={signUpHandler} />
                </View>
                {error && <Text>{error}</Text>}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible);}}
                >
                    <View style={styles.modalView}>
                        <Pressable
                            style={styles.modalButtonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <AntDesign name="closecircleo" size={40} color="#FB8500" />
                        </Pressable>
                        <View style={styles.modalForm}>
                            <Text style={styles.modalText}>Forgot password?</Text>
                            <FormTextInput
                                placeholder={"Email address"}
                                value={resetEmail}
                                onChangeText={(text) => setResetEmail(text)}
                                containerStyle={{marginTop: 10, marginBottom: 30}}
                                padding // to remove padding
                            />
                            <LoginButton 
                                text={"Reset"} 
                                onPress={() => {
                                    resetPassword(resetEmail);
                                    setModalVisible(false);
                                    Alert.alert("Reset Email Sent", "Password reset email was sent to " + resetEmail);
                                }} 
                            />
                        </View>
                    </View>
                </Modal>
                <ForgotPassword onPress={() => setModalVisible(true)} containerStyle={styles.forgot}>Forgot Password?</ForgotPassword>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    modalView: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalButtonClose: {
        position: 'absolute',
        top: 80,
        right: 40,
    }, 

    modalForm: {
        justifyContent: 'center',
        maxWidth: '80%',
    },

    modalText: {
        fontSize: 28,
        fontWeight: '300'
    },

    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 30,
    },

    titleContainer: {
        width: '100%',
        marginBottom: 80,
        marginTop: 60,
    },

    title: {
        fontSize: 54,
        fontWeight: '700',
    },
    
    subTitle: {
        fontSize: 38,
        marginTop: 10,
        fontWeight: "300",
        letterSpacing: 4,
    },

    inputContainer: {
        marginBottom: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, 

    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    forgot: {
        position: 'absolute',
        bottom: 30,
    },
});