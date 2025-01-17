// screens/DetailScreen.tsx
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";




export default function DetailScreen() {
    const navigation = useNavigation();
  const item = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Active: {item.active ? "Yes" : "No"}</Text>
      <Text>Week Days: {item.weekDays}</Text>
      <Text>Days in Month: {item.daysInMonth}</Text>
      <Text>Frequency Type: {item.frequencyType}</Text>
      <Text>Time of the Day: {item.timeOfTheDay}</Text>
      <Text>Rule Type: {item.ruleType}</Text>
      <Text>Listing Position: {item.listingPosition}</Text>
      <Text>Representation Date: {item.representationDate}</Text>
      <Text>Completion Date: {item.completionDate}</Text>
      <Text>Status: {item.status ? "Completed" : "Pending"}</Text>
      <Text>Value: {item.value}</Text>
      <Text>Target Value: {item.targetValue}</Text>
      <Text>History Target Value: {item.historyTargetValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
