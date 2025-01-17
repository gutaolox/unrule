import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import CheckBoxControl from "../utils/CheckBoxControl";
import { RuleContext } from "@/src/hooks/ruleProvider";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RuleListInfo, SaveHistoryProps } from "@/src/entity/ruleBase";
import OptionsMenu from "../utils/optionsMenu";

interface RuleCardProps {
  data: RuleListInfo;
}

const RuleCard: React.FC<RuleCardProps> = ({ data }) => {
  const { saveHistoryService, disableRuleService, setSelectedRule } =
    useContext(RuleContext); // usar o contexto
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <CheckBoxControl
            onCheck={(value) =>
              saveHistoryService({
                ruleId: data.id,
                representationDate: data.representationDate,
                status: value,
                justificationId: data.justificationId,
              })
            }
            value={data.name}
            initialValue={data.status}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{data.name}</Text>
          </View>
          <View>
            <OptionsMenu
              options={[
                {
                  name: "Delete",
                  onClick: () => disableRuleService(data.ruleId),
                },
                {
                  name: "Justificar",
                  onClick: () => {
                    setSelectedRule(data);
                  },
                },
              ]}
            />
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
