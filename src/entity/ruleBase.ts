export interface Rule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  weekDays: string[];
  daysInMonth: Date[];
  frequencyType: FrequencyType;
  timeOfTheDay: TimeOfTheDay;
  ruleType: RuleType;
  targetValue?: string;
  listingPosition: number;
}

export interface RulesHistyory {
  id: string;
  ruleId: string;
  representationDate: Date;
  completionDate: Date;
  status: boolean;
  value?: string;
  historyTargetValue?: string;
}

export type CreateRuleProps = Omit<Rule, "id" | "listingPosition">;
export type ReorderRuleProps = Pick<Rule, "id" | "listingPosition">;
export type SaveHistoryProps = Omit<RulesHistyory, "id" | "completionDate">;
export type CreateRuleHistoryProps = Omit<SaveHistoryProps, "status">;
export interface RuleListInfo
  extends Rule,
    Omit<RulesHistyory, "id" | "weekDays"> {
  weekDayId: number;
  weekDayName: string;
  weekDayCode: number;
}

export enum RuleType {
  Continous = "Continous",
  Discrete = "Discrete",
}

export enum FrequencyType {
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
  Once = "Once",
}

export enum TimeOfTheDay {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
}

export enum WeekDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const weekDaysOptions = [
  { id: 0, name: "Sunday" },
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
];