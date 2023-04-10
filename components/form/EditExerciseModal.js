import { Modal, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { useContext, useState } from 'react'
import { colors } from '../../constants/Globalstyles';
import { AntDesign } from '@expo/vector-icons';
import { SettingsContext } from '../../store/settings-context';
import { muscleGroupIDtoString, scoreTypeIDtoString } from '../../constants/lookup';
import { ValidateExercise } from '../../util/ValidateExercise';
import { exerciseDB } from '../../database/localDB';
import GestureRecognizer from 'react-native-swipe-gestures';
import PickerInput from './PickerInput';
import LoginButton from '../ui/Login/LoginButton';
import RadioInput from './RadioInput';
import BasicTextInput from './BasicTextInput';

const EditExerciseModal = ({visible, onRequestClose, exercise, setForceRefresh}) => {
    if(!exercise) {
        return;
    }

    const [name, setName] = useState(exercise.name);
    const [scoreType, setScoreType] = useState(exercise.scoreType_id);
    const [muscleGroup, setMuscleGroup] = useState(exercise.muscleGroup_id);
    const settingsCtx = useContext(SettingsContext);

    function formSubmitHandler() {
        const result = ValidateExercise(name, parseInt(muscleGroup), parseInt(scoreType));
        if(result.length > 0) {
            console.log(result);
            return;
        }
        // await update to the local database 
        exerciseDB.transaction(tx => {
            tx.executeSql(
                "UPDATE exercises SET scoreType_id = (?), muscleGroup_id = (?), name = (?) WHERE id = (?)",
                [parseInt(scoreType), parseInt(muscleGroup), name, exercise.id],
                (tx, resultSet) => {},
                (tx, error) => { console.error(`[Error] From EditExerciseModal.FormSubmitHandler ${error}`); }
            );
        });
        // trigger an update to the parent component
        setForceRefresh(prevRefresh => !prevRefresh);
        // close the modal
        onRequestClose();
    }

    return (
        <GestureRecognizer style={{flex: 1}}
            onSwipeDown={onRequestClose}
        >
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
            animationType='slide'
        >
            <SafeAreaView style={[styles.container, {backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.white}]}>
                <View style={[styles.row, {alignItems: 'flex-end',}]}>
                    <TouchableOpacity onPress={onRequestClose} style={styles.touchable}>
                        <AntDesign name="closecircleo" size={46} color={settingsCtx.darkMode ? colors.white : colors.charcoal} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, {alignItems: 'center'}]}>
                    <View>
                        <Text style={[styles.titleText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>Edit Exercise</Text>
                        <View style={styles.nameContainer}>
                            <Text style={styles.promptText}>Name</Text>
                            <BasicTextInput
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholder={name}
                            />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.promptText}>Muscle</Text>
                            <PickerInput
                                options={muscleGroupIDtoString}
                                selectedOption={muscleGroup}
                                setSelectedOption={setMuscleGroup}  
                            />
                        </View>
                        <View style={styles.radioContainer}>
                            <Text style={styles.promptText}>Mode</Text>
                            <RadioInput 
                                options={scoreTypeIDtoString}
                                selectedOption={scoreType}
                                setSelectedOption={(id) => setScoreType(id)}
                            />
                        </View>
                    </View>
                    <LoginButton 
                        text={"Update"}
                        onPress={formSubmitHandler}
                    />
                </View>
            </SafeAreaView>
        </Modal>
        </GestureRecognizer>
    )
}

export default EditExerciseModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    row: {
        marginVertical: 10,
        width: '100%',
    },

    touchable: {
        marginRight: 25,
    },

    titleText: {
        fontWeight: '700',
        fontSize: 36,
    },

    nameContainer: {
        marginTop: 30,
    },

    radioContainer: {
        marginVertical: 30,
    },

    promptText: {
        fontWeight: '700',
        fontSize: 12,
        marginBottom: 5,
        color: colors.gray,
        textTransform: 'uppercase'
    }
})