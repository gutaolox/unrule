import * as SQLite from "expo-sqlite";
const database_name = "rules.db";


export const getDBConnection = async () => {
  return await SQLite.openDatabaseAsync(database_name);
};
