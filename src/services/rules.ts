import {
  CreateRuleProps,
  FrequencyType,
  ReorderRuleProps,
  RuleListInfo,
  SaveHistoryProps,
} from "../entity/ruleBase";
import { getDBConnection } from "./database";
import * as Crypto from "expo-crypto";

// Função para selecionar todos os registros da tabela Rule
export const getAllRules = async () => {
  const db = await getDBConnection();
  const query = "SELECT * FROM Rule";
  const results = await db.getAllAsync(query);
  return results;
};

// Função para selecionar todos os registros da tabela History
export const getAllHistory = async () => {
  const db = await getDBConnection();
  const query = "SELECT * FROM History";
  const results = await db.getAllAsync(query);
  return results;
};

// Função para selecionar todos os registros da tabela WeekDays
export const getAllWeekDays = async () => {
  const db = await getDBConnection();
  const query = "SELECT * FROM WeekDays";
  const results = await db.getAllAsync(query);
  return results;
};

// Função para selecionar todos os registros da tabela RuleWeekDays
export const getAllRuleWeekDays = async () => {
  const db = await getDBConnection();
  const query = "SELECT * FROM RuleWeekDays";
  const results = await db.getAllAsync(query);
  return results;
};

export const createTables = async () => {
  const db = await getDBConnection();
  console.log(db);

  const createRuleTableQuery = `
    CREATE TABLE IF NOT EXISTS Rule (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      active INTEGER NOT NULL,
      daysInMonth TEXT,
      frequencyType TEXT NOT NULL,
      timeOfTheDay TEXT NOT NULL,
      ruleType TEXT NOT NULL,
      targetValue TEXT,
      listingPosition INTEGER AUTO_INCREMENT DEFAULT 0
    );
  `;

  const createHistoryTableQuery = `
    CREATE TABLE IF NOT EXISTS History (
      id TEXT PRIMARY KEY NOT NULL,
      ruleId TEXT NOT NULL,
      representationDate TEXT NOT NULL,
      status INTEGER NOT NULL,
      value TEXT,
      targetValue TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ruleId) REFERENCES Rule(id)
    );
  `;

  const createWeekDaysTableQuery = `
    CREATE TABLE IF NOT EXISTS WeekDays (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      code INTEGER NOT NULL
    );
  `;

  const createRuleWeekDaysTableQuery = `
    CREATE TABLE IF NOT EXISTS RuleWeekDays (
      ruleId TEXT NOT NULL,
      weekDayId INTEGER NOT NULL,
      FOREIGN KEY (ruleId) REFERENCES Rule(id),
      FOREIGN KEY (weekDayId) REFERENCES WeekDays(id),
      PRIMARY KEY (ruleId, weekDayId)
    );
  `;

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    ${createRuleTableQuery}
    ${createHistoryTableQuery}
    ${createWeekDaysTableQuery}
    ${createRuleWeekDaysTableQuery}
  `);

  const weekDays = [
    { id: 0, name: "Sunday", code: 0 },
    { id: 1, name: "Monday", code: 1 },
    { id: 2, name: "Tuesday", code: 2 },
    { id: 3, name: "Wednesday", code: 3 },
    { id: 4, name: "Thursday", code: 4 },
    { id: 5, name: "Friday", code: 5 },
    { id: 6, name: "Saturday", code: 6 },
  ];

  for (const day of weekDays) {
    await db.runAsync(
      `INSERT OR IGNORE INTO WeekDays (id, name, code) VALUES (?, ?, ?)`,
      day.id,
      day.name,
      day.code
    );
  }
};

export const resetDatabase = async () => {
  const db = await getDBConnection();

  const dropRuleWeekDaysTableQuery = "DROP TABLE IF EXISTS RuleWeekDays";
  const dropWeekDaysTableQuery = "DROP TABLE IF EXISTS WeekDays";
  const dropHistoryTableQuery = "DROP TABLE IF EXISTS History";
  const dropRuleTableQuery = "DROP TABLE IF EXISTS Rule";

  await db.execAsync(`
    ${dropRuleWeekDaysTableQuery};
    ${dropWeekDaysTableQuery};
    ${dropHistoryTableQuery};
    ${dropRuleTableQuery};
  `);

  console.log("Database reset successfully");
};

export async function getRulesWithHistory(date: Date): Promise<RuleListInfo[]> {
  const db = await getDBConnection();
  const formattedDate = date.toISOString().split("T")[0]; // Formatar a data para YYYY-MM-DD

  const query = `
    SELECT Rule.*, History.representationDate, History.status, History.value, History.targetValue,
           WeekDays.id as weekDayId, WeekDays.name as weekDayName, WeekDays.code as weekDayCode
    FROM Rule
    LEFT JOIN History ON Rule.id = History.ruleId
    LEFT JOIN RuleWeekDays ON Rule.id = RuleWeekDays.ruleId
    LEFT JOIN WeekDays ON RuleWeekDays.weekDayId = WeekDays.id
    WHERE  (WeekDays.id = ? OR WeekDays.code IS NULL)
    AND Rule.active = 1
    ORDER BY Rule.listingPosition;
  `;

  

  const results = await db.getAllAsync<RuleListInfo>(query, [
    date.getDay(),
    formattedDate,
  ]);
  const rules = [] as RuleListInfo[];

  for (const result of results) {
    rules.push(result);
  }

  return rules;
}

export async function saveHistory(history: SaveHistoryProps) {
  const db = await getDBConnection();
  const query = `
    INSERT OR REPLACE INTO History (id, ruleId, representationDate, status, value, targetValue)
    VALUES (
      COALESCE((SELECT id FROM History WHERE ruleId = ? AND representationDate = ?), ?),
      ?, ?, ?, ?, ?
    );
  `;
  await db.runAsync(query, [
    history.ruleId,
    history.representationDate.toISOString(),
    Crypto.randomUUID(),
    history.ruleId,
    history.representationDate.toISOString(),
    history.status ? 1 : 0,
    history.value ?? null,
    history.historyTargetValue ?? null,
  ]);

  const teste = await getAllHistory();
  console.log(teste);
}

export async function updateOrder(reorderInfo: ReorderRuleProps[]) {
  const db = await getDBConnection();
  const query = `
    UPDATE Rule
    SET listingPosition = ?
    WHERE id = ?;
  `;

  for (const { id, listingPosition } of reorderInfo) {
    await db.runAsync(query, [listingPosition, id]);
  }
}

export async function createRule(rule: CreateRuleProps) {
  const db = await getDBConnection();
  const ruleId = Crypto.randomUUID();
  const query = `
    INSERT INTO Rule (id, name, description, active, daysInMonth, frequencyType, timeOfTheDay, ruleType, targetValue)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  await db.runAsync(query, [
    ruleId,
    rule.name,
    rule.description,
    1,
    JSON.stringify(rule.daysInMonth?.map((date) => date.toISOString()) ?? []),
    rule.frequencyType,
    rule.timeOfTheDay,
    rule.ruleType ?? "Discrete", //TODO: remover nullable depois
    rule.targetValue ?? null,
  ]);
  if (rule.frequencyType === FrequencyType.Weekly) {
    const weekDaysQuery = `
    INSERT INTO RuleWeekDays (ruleId, weekDayId)
    VALUES (?, ?);
  `;

    for (const weekDayId of rule.weekDays) {
      await db.runAsync(weekDaysQuery, ruleId, weekDayId);
    }
  }
}

export async function disableRule(id: string) {
  const db = await getDBConnection();
  const query = `
    UPDATE Rule
    SET active = 0
    WHERE id = ?;
  `;
  await db.runAsync(query, id);
}

export async function enableRule(id: string) {
  const db = await getDBConnection();
  const query = `
    UPDATE Rule
    SET active = 1
    WHERE id = ?;
  `;
  await db.runAsync(query, id);
}
