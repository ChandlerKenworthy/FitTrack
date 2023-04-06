import { Modal, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Pressable, TextInput } from 'react-native'
import { colors } from '../../constants/Globalstyles'
import { exerciseDB } from '../../database/localDB';
import { useContext, useEffect, useState } from 'react'
import { SettingsContext } from '../../store/settings-context'
import { AntDesign } from '@expo/vector-icons';
import { muscleGroupIDtoString } from '../../constants/lookup';
import PillFilter from './PillFilter';
import ExerciseSnippet from '../exercise/ExerciseSnippet';

const PickExerciseModal = ({open, setOpen, selectExerciseHandler}) => {
    const settingsCtx = useContext(SettingsContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState([]);
    const [exercises, setExercises] = useState();

    useEffect(() => {
        const searchTermExists = !(searchTerm === "" || searchTerm === null || searchTerm === undefined || searchTerm.length < 2);
        if(!searchTermExists && filter.length === 0) { // No search, no filters - get everything
            exerciseDB.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM exercises ORDER BY name ASC",
                    null,
                    (txObj, resultSet) => {
                        setExercises(resultSet.rows._array);
                    },
                    (txObj, error) => { 
                        console.log(`[Error in PickExerciseModal] ${error}`); 
                    }
                );
            });
        } else { // At least a search or a filter is active
            let sqlString = "SELECT * FROM exercises WHERE ";
            if(filter.length !== 0) {
                sqlString += "("
                for(let i = 0; i < filter.length; i++) {
                    sqlString += "muscleGroup_id = " + filter[i];
                    if(i !== filter.length - 1) {
                        sqlString += " OR ";
                    }
                }
                sqlString += ")"
            }
            if(searchTermExists) {
                if(filter.length !== 0) {
                    sqlString += " AND" 
                }
                sqlString += " instr(UPPER(name), \"" + searchTerm.toUpperCase() + "\") > 0";
            }
            sqlString += " ORDER BY name ASC";

            exerciseDB.transaction(tx => {
                tx.executeSql(
                    sqlString,
                    null,
                    (txObj, resultSet) => { setExercises(resultSet.rows._array); },
                    (txObj, error) => { console.log(error); }
                );
            });
        }
    }, [searchTerm, filter]);

    function updateFilterHandler(filterId) {
        const filterCurrentlyActive = filter.includes(filterId);
        if(filterCurrentlyActive) {
            setFilter(prevFilter => {
                return prevFilter.filter(el => el !== filterId);
            });   
        } else {
            setFilter(prevFilter => [...prevFilter, filterId]);
        }
    }

    return (
        <Modal
            visible={open}
            onRequestClose={() => setOpen(false)}
            animationType='slide'
        >
            <SafeAreaView style={[styles.container, {backgroundColor: settingsCtx.darkMode ? colors.extralightblack : colors.white}]}>
                <View style={[styles.row, {alignItems: 'flex-end',}]}>
                    <TouchableOpacity onPress={() => setOpen(false)} style={styles.touchable}>
                        <AntDesign name="closecircleo" size={46} color={settingsCtx.darkMode ? colors.white : colors.charcoal} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, {alignItems: 'center'}]}>
                    <View>
                        <Text style={[styles.titleText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>Select Exercise</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder={"Search exercises..."}
                            value={searchTerm}
                            onChangeText={(txt) => setSearchTerm(txt)}
                            autoCapitalize='none'
                            style={styles.input}
                        />
                        <Pressable onPress={() => {
                            if(searchTerm && searchTerm.length > 0) {
                                setSearchTerm("");
                            }
                        }}>
                            <AntDesign name={searchTerm && searchTerm.length > 0 ? "reload1" : "search1"} size={22} color={colors.lightgray} />
                        </Pressable>
                    </View>
                    <View style={styles.filtersContainer}>
                        {Object.entries(muscleGroupIDtoString).map(([id, name]) => {
                            return (
                                <PillFilter 
                                    id={parseInt(id)} 
                                    key={id}
                                    name={name} 
                                    isSelected={filter.includes(parseInt(id))} 
                                    setIsSelected={updateFilterHandler}
                                    style={{backgroundColor: filter.includes(parseInt(id)) ? colors.white : colors.extralightgray, borderRadius: 30}}
                                />
                            );
                        })}
                    </View>
                </View>
                <View style={{width: '100%'}}>
                    <FlatList 
                        data={exercises}
                        renderItem={({item}) => <ExerciseSnippet data={item} onPress={selectExerciseHandler} />}
                        keyExtractor={(item) => item.name}
                        ItemSeparatorComponent={() => <View style={{marginVertical: 5}}></View>}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default PickExerciseModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.offwhite
    },

    row: {
        marginVertical: 10,
        width: '100%',
    },

    touchable: {
        marginRight: 5,
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
    },

    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray
    },

    input: {
        color: colors.charcoal,
        paddingBottom: 10,
        fontSize: 20,
    },

    filtersContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})