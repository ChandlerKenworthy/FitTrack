import * as SQLite from 'expo-sqlite';

/* createDatabase
 * Opens the exercises database and makes the exercises table if it does not already exist
*/

export const exerciseDB = SQLite.openDatabase("exercises.db");

export function createDatabse() {
    exerciseDB.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, muscleGroup_id INTEGER, scoreType_id INTEGER, isFavorite INTEGER NOT NULL DEFAULT 0)",
            null,
            (tx, resultSet) => {},
            (tx, error) => { console.log(`[Error from localDB.js] ${error}`) }
        );
    });
}
