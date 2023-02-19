import * as SQLite from 'expo-sqlite';

export const exerciseDB = SQLite.openDatabase("exercises.db");

export function loadDatabases() {
    exerciseDB.transaction(tx => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, muscleGroup_id INTEGER, scoreType_id INTEGER)");
    });
}
