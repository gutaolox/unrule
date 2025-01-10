import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  CreateRuleProps,
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
  updateOrder,
} from "../services/rules";
import { DateContext } from "./dateProvider";
import mockRuleListInfo from "../entity/ruleMock";

interface RuleContextProps {
  rules: RuleListInfo[];
  createRuleService: (rule: CreateRuleProps) => Promise<void>;
  saveHistoryService: (history: SaveHistoryProps) => Promise<void>;
  updateOrderService: (reorderInfo: ReorderRuleProps[]) => Promise<void>;
  disableRuleService: (id: string) => Promise<void>;
  enableRuleService: (id: string) => Promise<void>;
  setRules: React.Dispatch<React.SetStateAction<RuleListInfo[]>>;
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
});

// Crie o provider
const RuleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<RuleListInfo[]>([]);
  const { selectedDate } = useContext(DateContext);

  const createRuleService = async (rule: CreateRuleProps) => {
    await createRule(rule);
  };
  const saveHistoryService = async (history: SaveHistoryProps) => {
    await saveHistory(history);
  };
  const updateOrderService = async (reorderInfo: ReorderRuleProps[]) => {
    await updateOrder(reorderInfo);
  };
  const disableRuleService = async (id: string) => {
    await disableRule(id);
  };
  const enableRuleService = async (id: string) => {
    await enableRule(id);
  };

  const setDatabase = useCallback(async () => {
    try {
      console.log("teste");
      await createTables();
    } catch (error) {
      console.error("Setting up database",  error);
    }
  }, []);

  const fetchData = useCallback(async (selectedParameter: Date) => {
    try {
      //const rules = await getRulesWithHistory(selectedParameter);
      //setData(rules);
      setData(mockRuleListInfo);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }, []);

  useEffect(() => {
    setDatabase();
  }, []);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate, fetchData]);

  return (
    <RuleContext.Provider
      value={{
        rules: data,
        createRuleService,
        saveHistoryService,
        updateOrderService,
        disableRuleService,
        enableRuleService,
        setRules: setData,
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};

export { RuleContext, RuleProvider };
