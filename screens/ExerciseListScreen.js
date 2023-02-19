import { FlatList, SafeAreaView, StyleSheet, View, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react';
import { colors } from '../constants/Globalstyles';
import ShortExerciseInfo from '../components/exercise/ShortExerciseInfo';
import { AntDesign } from '@expo/vector-icons';
import { exerciseDB } from '../database/localDB';
import { useIsFocused } from '@react-navigation/native';

const ExerciseListScreen = () => {
    const [exercises, setExercises] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const isFocused = useIsFocused();

    useEffect(() => {
        setSearchTerm("");
    }, [isFocused]);

    useEffect(() => {
        if(searchTerm === "" || searchTerm === null || searchTerm === undefined || searchTerm.length < 2) {
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
        } else {
            exerciseDB.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM exercises WHERE instr(UPPER(name), ?) > 0 ORDER BY name ASC",
                    [searchTerm.toUpperCase()],
                    (txObj, resultSet) => {
                        setExercises(resultSet.rows._array);
                    },
                    (txObj, error) => { console.log(error); }
                );
            });
        }
    }, [searchTerm, isFocused]);

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
            <FlatList 
                data={exercises}
                renderItem={({item}) => <ShortExerciseInfo item={item} searchTerm={searchTerm} />}
                keyExtractor={(item) => item.name}
            />
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

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loadingText: {
        fontSize: 24,
        fontWeight: '300',
        color: colors.gray
    },

    root: {
        flex: 1,
    },

    input: {
        color: colors.charcoal,
        paddingBottom: 10,
        fontSize: 20,
    }
})