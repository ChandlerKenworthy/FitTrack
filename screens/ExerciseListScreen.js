import { FlatList, SafeAreaView, StyleSheet, View, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react';
import { colors } from '../constants/Globalstyles';
import ShortExerciseInfo from '../components/exercise/ShortExerciseInfo';
import { AntDesign } from '@expo/vector-icons';
import { exerciseDB } from '../database/localDB';
import { useIsFocused } from '@react-navigation/native';
import EditExerciseModal from '../components/form/EditExerciseModal';
import PillFilter from '../components/form/PillFilter';
import { muscleGroupIDtoString } from '../constants/lookup';

/* ExerciseListScreen
 * Render exercises from exercises table in exercises database according to user's search term and any active
 * filters. Exercise's rendered using swipeable components.
 * Author: Chandler Kenworthy (04/02/2023)
*/

const ExerciseListScreen = () => {
    const [exercises, setExercises] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState([]);
    const [forceRefresh, setForceRefresh] = useState(true);
    const [editModal, setEditModal] = useState({isOpen: false, data: null});
    const isFocused = useIsFocused();

    useEffect(() => {
        setSearchTerm("");
        setFilter([]);
    }, [isFocused]);

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
                    (txObj, error) => { console.log(error); }
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
    }, [searchTerm, filter, forceRefresh]);

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
        <SafeAreaView style={styles.root}>
            <View style={styles.searchContainer}>
                <TextInput 
                    placeholder={"Search exercises..."}
                    value={searchTerm}
                    onChangeText={(txt) => setSearchTerm(txt)}
                    autoCapitalize={false}
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
                        />
                    );
                })}
            </View>
            <View style={styles.listContainer}>
                <EditExerciseModal 
                    visible={editModal.isOpen} 
                    onRequestClose={() => setEditModal({isOpen: false, data: null})} 
                    exercise={editModal.data} 
                    setForceRefresh={setForceRefresh}
                />
                <FlatList 
                    data={exercises}
                    renderItem={({item}) => <ShortExerciseInfo item={item} searchTerm={searchTerm} forceRefresh={setForceRefresh} toggleModal={setEditModal} />}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </SafeAreaView>
    )
}

export default ExerciseListScreen

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    filtersContainer: {
        marginHorizontal: 15,
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    root: {
        flex: 1,
    },

    input: {
        color: colors.charcoal,
        paddingBottom: 10,
        fontSize: 20,
    },

    listContainer: {
        marginHorizontal: 10
    }
})