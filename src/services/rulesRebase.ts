import { SQLiteDatabase } from "expo-sqlite";
import { getDBConnection } from "./database";
import { createTables } from "./rules";

const reinsertData = async (
  db: SQLiteDatabase,
  data: { [key: string]: any[] }
) => {
  for (const table in data) {
    const rows = data[table];
    if (table === "History") {
      for (const row of rows) {
        row.representationDate = row.representationDate.split("T")[0];
      }
    }
    if (table === "Rule") {
      for (const row of rows) {
        row.daysOfWeek = data["RuleWeekDays"]
          .filter((ruleWeekDay: any) => ruleWeekDay.ruleId === row.id)
          .map((ruleWeekDay: any) => ruleWeekDay.weekDayId)
          .join(",");
        row.daysInMonth = data["RuleMonthDays"]
          .filter((ruleMonthDay: any) => ruleMonthDay.ruleId === row.id)
          .map((ruleMonthDay: any) => ruleMonthDay.dayInMonth)
          .join(",");
      }
    }
    for (const row of rows) {
      const columns = Object.keys(row).join(", ");
      const placeholders = Object.keys(row)
        .map(() => "?")
        .join(", ");
      const values = Object.values<any>(row);

      const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
      await db.runAsync(query, values);
    }
  }
};

const deleteAllTables = async (db: SQLiteDatabase) => {
  const dropQueries = [
    "DROP TABLE IF EXISTS RuleWeekDays",
    "DROP TABLE IF EXISTS WeekDays",
    "DROP TABLE IF EXISTS History",
    "DROP TABLE IF EXISTS Rule",
    "DROP TABLE IF EXISTS RuleMonthDays",
  ];

  for (const query of dropQueries) {
    await db.execAsync(query);
  }
};

export const resetAndRecreateDatabase = async () => {
  const db = await getDBConnection();

  try {
    const data = await readAllTables(db);
    await deleteAllTables(db);
    await createTables(db);
    await reinsertData(db, data);
    console.log("Database reset and recreated successfully");
  } catch (error) {
    console.error("Error resetting and recreating database:", error);
  } finally {
    await db.closeAsync();
  }
};

// Função para ler todas as tabelas e seus dados
const readAllTables = async (db: SQLiteDatabase) => {
  const tables = ["Rule", "History", "RuleWeekDays", "RuleMonthDays"];
  const data: { [key: string]: any[] } = {};

  for (const table of tables) {
    const query = `SELECT * FROM ${table}`;
    const results = await db.getAllAsync(query);
    data[table] = results;
  }

  return data;
};
