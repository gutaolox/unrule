import React from "react";
import { Stack } from "expo-router";

const RulesLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        title: "Unrule",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="details" />
      <Stack.Screen name="dataInfo" />
    </Stack>
  );
};

export default RulesLayout;
