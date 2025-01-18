import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
} from "react";
import {
  CreateRuleProps,
  Justification,
  ReorderRuleProps,
  RuleListInfo,
  SaveHistoryProps,
} from "../entity/ruleBase";
import {
  createRule,
  createTables,
  disableRule,
  enableRule,
  getRulesWithHistory,
  saveHistory,
} from "../services/rules";
import { DateContext } from "./dateProvider";
import RuleOrderReducer from "../reducers/RuleReducer";
import { getJustifications } from "../services/justification";

interface RuleContextProps {
  rules: RuleListInfo[];
  createRuleService: (rule: CreateRuleProps) => Promise<void>;
  saveHistoryService: (history: SaveHistoryProps) => Promise<void>;
  updateOrderService: (reorderInfo: ReorderRuleProps[]) => void;
  disableRuleService: (id: string) => Promise<void>;
  enableRuleService: (id: string) => Promise<void>;
  setRules: React.Dispatch<React.SetStateAction<RuleListInfo[]>>;
  representationDate: Date;
  resetData: () => void;
  selectedRule?: RuleListInfo;
  setSelectedRule: React.Dispatch<
    React.SetStateAction<RuleListInfo | undefined>
  >;
  
}

// Crie o contexto
const RuleContext = createContext<RuleContextProps>({
  rules: [],
  createRuleService: async () => {},
  saveHistoryService: async () => {},
  updateOrderService: async () => {},
  disableRuleService: async () => {},
  enableRuleService: async () => {},
  setRules: () => {},
  representationDate: new Date(),
  resetData: () => {},
  selectedRule: undefined,
  setSelectedRule: () => {},
});

// Crie o provider
const RuleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<RuleListInfo[]>([]);
  const [lastPosition, setLastPosition] = useState<number>(0);
  const [selectedRule, setSelectedRule] = useState<RuleListInfo>();
  const { selectedDate, resetDate } = useContext(DateContext);

  const createRuleService = async (rule: CreateRuleProps) => {
    try {
      await createRule({ ...rule, listingPosition: lastPosition });
      fetchData(selectedDate);
    } catch (error) {
      console.error("Failed to create rule", error);
    }
  };

  const saveHistoryService = async (history: SaveHistoryProps) => {
    try {
      await saveHistory(history);
      fetchData(selectedDate);
    } catch (error) {
      console.error("Failed to save history", error);
    }
  };
  const updateOrderService = (reorderInfo: ReorderRuleProps[]) => {
    // dispatchOrder({ type: "UPDATE_ORDER", data: reorderInfo });
    // setLastPosition(reorderInfo[reorderInfo.length - 1].listingPosition + 1);
  };
  const disableRuleService = async (id: string) => {
    await disableRule(id);
    await fetchData(selectedDate);
  };
  const enableRuleService = async (id: string) => {
    await enableRule(id);
  };

  const setDatabase = useCallback(async () => {
    try {
      //await resetAndRecreateDatabase();
      await createTables();
      console.log("tarefa criada")
      //await resetDatabase()
    } catch (error) {
      console.error("Setting up database", error);
    }
  }, []);

  const fetchData = useCallback(async (selectedParameter: Date) => {
    try {
      const rules = await getRulesWithHistory(selectedParameter);
      console.log(JSON.stringify(rules, null, 2));
      // console.log(rules.length);
      setData(rules);
      setLastPosition(rules[rules.length - 1]?.listingPosition ?? 0 + 1);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }, []);

  const resetData = () => {
    resetDate();
  };

  useEffect(() => {
    setDatabase();
  }, []);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  return (
    <RuleContext.Provider
      value={{
        rules: data,
        createRuleService,
        saveHistoryService,
        updateOrderService,
        disableRuleService,
        enableRuleService,
        representationDate: selectedDate,
        setRules: setData,
        resetData,
        selectedRule,
        setSelectedRule,
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};

export { RuleContext, RuleProvider };
