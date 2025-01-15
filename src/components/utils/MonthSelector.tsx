import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DaySelectorProps {
  selectedDays: number[];
  onSelectDay: (day: number[]) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  onSelectDay,
}) => {
  const handleDayPress = (day: number) => {
    if (selectedDays.includes(day)) {
      // Remove day from selected days
      const updatedDays = selectedDays.filter((d) => d !== day);
      onSelectDay(updatedDays);
    } else {
      // Add day to selected days
      const updatedDays = [...selectedDays, day];
      onSelectDay(updatedDays);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(31)].map((_, index) => {
        const day = index + 1;
        const isSelected = selectedDays.includes(day);

        return (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayContainer,
              isSelected && styles.selectedDayContainer,
            ]}
            onPress={() => handleDayPress(day)}
          >
            <Text
              style={[styles.dayText, isSelected && styles.selectedDayText]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  dayContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  selectedDayContainer: {
    backgroundColor: "#6200ee",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
  },
});

export default DaySelector;
