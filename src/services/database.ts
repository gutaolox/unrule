import * as SQLite from "expo-sqlite";
const database_name = "rules.db";


export const getDBConnection = async () => {
   const db = await SQLite.openDatabaseAsync(database_name, {
     useNewConnection: true,
   });
  console.log(db)
  return db
};
