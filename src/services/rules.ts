import {
  CreateRuleProps,
  ReorderRuleProps,
  RuleListInfo,
  SaveHistoryProps,
} from "../entity/ruleBase";
import { getDBConnection } from "./database";



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
    { id: 0, name: "Monday", code: 0 },
    { id: 1, name: "Tuesday", code: 1 },
    { id: 2, name: "Wednesday", code: 2 },
    { id: 3, name: "Thursday", code: 3 },
    { id: 4, name: "Friday", code: 4 },
    { id: 5, name: "Saturday", code: 5 },
    { id: 6, name: "Sunday", code: 6 },
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

export async function getRulesWithHistory(date: Date): Promise<RuleListInfo[]> {
  const db = await getDBConnection();
  const formattedDate = date.toISOString().split("T")[0]; // Formatar a data para YYYY-MM-DD

  const query = `
    SELECT Rule.*, History.representationDate, History.status, History.value, History.targetValue,
           WeekDays.id as weekDayId, WeekDays.name as weekDayName, WeekDays.code as weekDayCode
    FROM Rule
    LEFT JOIN History ON Rule.id = History.ruleId
    LEFT JOIN RuleWeekDays ON Rule.id = RuleWeekDays.ruleId
    INNER JOIN WeekDays ON RuleWeekDays.weekDayId = WeekDays.id AND WeekDays.code = ?
    WHERE (History.representationDate IS NULL OR History.representationDate = ?)
    AND Rule.active = 1
    ORDER BY Rule.listingPosition;
  `;

  const results = await db.getAllAsync<RuleListInfo>(query, [
    formattedDate,
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
      (SELECT id FROM History WHERE ruleId = ? AND representationDate = ?),
      ?, ?, ?, ?, ?
    );
  `;
  await db.runAsync(query, [
    history.ruleId,
    history.representationDate.toISOString(),
    history.ruleId,
    history.representationDate.toISOString(),
    history.status ? 1 : 0,
    history.value,
    history.historyTargetValue,
  ]);
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
  const ruleId = crypto.randomUUID();
  const query = `
    INSERT INTO Rule (id, name, description, active, weekDays, daysInMonth, frequencyType, timeOfTheDay, ruleType, targetValue)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  await db.runAsync(query, [
    ruleId,
    rule.name,
    rule.description,
    rule.active ? 1 : 0,
    JSON.stringify(rule.weekDays),
    JSON.stringify(rule.daysInMonth.map((date) => date.toISOString())),
    rule.frequencyType,
    rule.timeOfTheDay,
    rule.ruleType,
    rule.targetValue ?? null,
  ]);

  const weekDaysQuery = `
    INSERT INTO RuleWeekDays (ruleId, weekDayId)
    VALUES (?, ?);
  `;

  for (const weekDayId of rule.weekDays) {
    await db.runAsync(weekDaysQuery, ruleId, weekDayId);
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
