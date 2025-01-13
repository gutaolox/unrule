import { InternacionalizationContext } from "@/src/hooks/internacionalizationProvider";
import { RuleContext } from "@/src/hooks/ruleProvider";
import React, { useContext, useMemo } from "react";
import { View, Text } from "react-native";

const RuleCompletion: React.FC = () => {
    const { rules } = useContext(RuleContext);
    const {getMessage} = useContext(InternacionalizationContext);

  const totalCompleted = useMemo(
    () => rules.filter((rule) => rule.status).length,
    [rules]
  );

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>
        {getMessage("Progress")} {totalCompleted}/{rules.length}
      </Text>
    </View>
  );
};

export default RuleCompletion;
