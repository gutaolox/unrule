import React, { useContext, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { DateContext } from "@/src/hooks/dateProvider";
import If from "../utils/If";
import AntDesign from "@expo/vector-icons/AntDesign";
import { weekDaysOptions } from "@/src/entity/ruleBase";
import { InternacionalizationContext } from "@/src/hooks/internacionalizationProvider";

const DateSelection = () => {
  const [showPicker, setShowPicker] = useState(false);
  const { selectedDate, nextDate, previousDate, setSelectedDate } =
    useContext(DateContext);
  const { getMessage } = useContext(InternacionalizationContext);
  const weekDay = useMemo(() => {
    const weekDay = selectedDate.getDay();
    return weekDaysOptions[weekDay].name;
  }, [selectedDate]);

  const onChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TouchableOpacity onPress={() => previousDate()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>
            {getMessage(weekDay)}{" "}
            {selectedDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <If condition={showPicker}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        </If>
      </View>
      <TouchableOpacity onPress={() => nextDate()}>
        <AntDesign name="arrowright" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  dateText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default DateSelection;
