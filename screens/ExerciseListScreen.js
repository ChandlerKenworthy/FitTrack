import { FlatList, SafeAreaView, StyleSheet, View, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react';
import { colors } from '../constants/Globalstyles';
import ShortExerciseInfo from '../components/exercise/ShortExerciseInfo';
import { exerciseList } from '../assets/DummyData';
import { AntDesign } from '@expo/vector-icons';

const ExerciseListScreen = () => {
    const [exercises, setExercises] = useState(exerciseList);
    // TODO: Make state actually get exercises from database
    const [searchTerm, setSearchTerm] = useState("");
    // TODO: Add a search icon to the text input component

    useEffect(() => {
        if(searchTerm === "" || searchTerm === null || searchTerm === undefined || searchTerm.length < 3) {
            setExercises(exerciseList);
        } else {
            const newExs = exerciseList.filter(ex => {
                const thisName = ex.name.toLocaleLowerCase();
                return thisName.includes(searchTerm.toLowerCase()) ? true : false;
            });
            setExercises(newExs);
        }
    }, [searchTerm]);

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
                    <AntDesign name={searchTerm && searchTerm.length > 0 ? "reload1" : "search1"} size={24} color={colors.lightgray} />
                </Pressable>
            </View>
            <FlatList 
                data={exercises}
                renderItem={ShortExerciseInfo}
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