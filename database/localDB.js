import * as SQLite from 'expo-sqlite';

/* createDatabase
 * Opens the exercises database and makes the exercises table if it does not already exist
*/

export const exerciseDB = SQLite.openDatabase("exercises.db");
export const workoutDB = SQLite.openDatabase("workouts.db");

export function createDatabse() {
    async function MakeExercisesDB() {
        return new Promise((resolve, reject) => {
            exerciseDB.transaction(tx => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, muscleGroup_id INTEGER, scoreType_id INTEGER, isFavorite INTEGER NOT NULL DEFAULT 0, personalBest INTEGER DEFAULT 0)",
                    null,
                    (tx, resultSet) => resolve(1),
                    (tx, error) => console.log(`[Error from localDB.js] ${error}`)
                );
            });
        });
    }

    async function MakeWorkoutsTable() {
        return new Promise((resolve, reject) => {
            workoutDB.transaction(tx => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, year INTEGER, month INTEGER, day INTEGER, totalVolume REAL, exercises TEXT, reps TEXT, weights TEXT)",
                    null,
                    (tx, resultSet) =>  resolve(1),
                    (tx, error) => console.log(`[Error from localDB.js] (workoutDB.transaction) ${error}`)
                );
            });
        })
    }

    async function MakeTemplateTable() {
        return new Promise((resolve, reject) => {
            workoutDB.transaction(tx => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS templates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, exercises TEXT, reps TEXT, occurences INTEGER NOT NULL DEFAULT 0, lastDate TEXT)",
                    null,
                    (tx, resultSet) =>  resolve(1),
                    (tx, error) => console.log(`[Error from localDB.js] (TemplateTable.transaction) ${error}`)
                );
            });
        })
    }

    MakeExercisesDB();
    MakeWorkoutsTable();
    MakeTemplateTable();

}
