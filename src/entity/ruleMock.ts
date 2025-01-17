import {
  RuleListInfo,
  RuleType,
  FrequencyType,
  TimeOfTheDay,
} from "./ruleBase";

const mockRuleListInfo: RuleListInfo[] = [
  {
    id: "1",
    name: "Morning Exercise",
    description: "Daily morning exercise routine",
    active: true,
    weekDays: ["Monday", "Wednesday", "Friday"],
    daysInMonth: [],
    frequencyType: FrequencyType.Daily,
    timeOfTheDay: TimeOfTheDay.Morning,
    ruleType: RuleType.Continous,
    targetValue: "30 minutes",
    listingPosition: 1,
    ruleId: "1",
    representationDate: new Date("2023-10-01"),
    completionDate: new Date("2023-10-01"),
    status: true,
    value: "30 minutes",
    historyTargetValue: "30 minutes",
    weekDayId: 0,
    weekDayName: "Monday",
    weekDayCode: 0,
  },
  {
    id: "2",
    name: "Read a Book",
    description: "Read a book for 1 hour",
    active: true,
    weekDays: ["Tuesday", "Thursday"],
    daysInMonth: [],
    frequencyType: FrequencyType.Weekly,
    timeOfTheDay: TimeOfTheDay.Evening,
    ruleType: RuleType.Discrete,
    targetValue: "1 hour",
    listingPosition: 2,
    ruleId: "2",
    representationDate: new Date("2023-10-02"),
    completionDate: new Date("2023-10-02"),
    status: false,
    value: "45 minutes",
    historyTargetValue: "1 hour",
    weekDayId: 1,
    weekDayName: "Tuesday",
    weekDayCode: 1,
  },
  {
    id: "3",
    name: "Monthly Report",
    description: "Prepare the monthly report",
    active: true,
    weekDays: [],
    daysInMonth: [new Date("2023-10-30")],
    frequencyType: FrequencyType.Monthly,
    timeOfTheDay: TimeOfTheDay.Afternoon,
    ruleType: RuleType.Discrete,
    targetValue: "Complete report",
    listingPosition: 3,
    ruleId: "3",
    representationDate: new Date("2023-10-30"),
    completionDate: new Date("2023-10-30"),
    status: true,
    value: "Complete report",
    historyTargetValue: "Complete report",
    weekDayId: 2,
    weekDayName: "Wednesday",
    weekDayCode: 2,
  },
];

export default mockRuleListInfo;
