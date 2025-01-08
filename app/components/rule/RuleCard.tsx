import { Card } from "@/components/ui/card";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import React from "react";

interface RuleCardProps {
  text: string;
}

const RuleCard: React.FC<RuleCardProps> = ({ text }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (value: boolean) => {
    console.log(value);
    setChecked(value);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.checkboxContainer}>
            <Checkbox isChecked={checked} onChange={handleCheck} value={"aaa"}>
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
            </Checkbox>
          </View>
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
  },
  card: {
    width: "80%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  checkboxContainer: {
    flex: 0.1,
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
