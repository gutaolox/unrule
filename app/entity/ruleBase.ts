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
  value: string;
  historyTargetValue: string;
}

export type CreateRuleProps = Omit<Rule, "id" | "listingPosition">;
export type ReorderRuleProps = Pick<Rule, "id" | "listingPosition">;
export type SaveHistoryProps = Omit<RulesHistyory, "id" | "completionDate">;
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
  Morning = 1,
  Afternoon = 2,
  Evening = 3,
}
