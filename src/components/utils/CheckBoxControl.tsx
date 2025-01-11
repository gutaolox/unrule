import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

interface CheckBoxControlProps {
  onCheck: (value: boolean) => void;
  value: string;
}

const CheckBoxControl = ({ onCheck, value = "standard" }: CheckBoxControlProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (value: boolean) => {
    setChecked(value);
    onCheck(value);
  };

  return (
    <View style={styles.container}>
      <Checkbox isChecked={checked} onChange={handleCheck} value={value}>
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
      </Checkbox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CheckBoxControl;
