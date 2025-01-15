import { ReorderRuleProps, RuleListInfo } from "@/src/entity/ruleBase";
import { updateOrder } from "@/src/services/rules";

interface Action {
  type: string;
  data: ReorderRuleProps[];
}

const RuleOrderReducer = (
  state: ReorderRuleProps[],
  action: Action
): ReorderRuleProps[] => {
  switch (action.type) {
    case "UPDATE_ORDER": {
      updateOrder(action.data);
      return state;
    }

    // Adicione os casos de ação aqui
    default:
      return state;
  }
};

export default RuleOrderReducer;
