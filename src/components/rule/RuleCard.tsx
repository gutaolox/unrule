import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import CheckBoxControl from "../utils/CheckBoxControl";
import { RuleContext } from "@/src/hooks/ruleProvider";
import { CreateRuleHistoryProps } from "@/src/entity/ruleBase";

interface RuleCardProps {
  text: string;
  data: CreateRuleHistoryProps;
}

const RuleCard: React.FC<RuleCardProps> = ({ text,data }) => {
  const { saveHistoryService } = useContext(RuleContext)
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <CheckBoxControl
            onCheck={(value) => saveHistoryService({...data,status:value})}
            value={text}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 100,
  },
  card: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textContainer: {
    flex: 0.8,
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Roboto-Regular",
  },
});

export default RuleCard;
