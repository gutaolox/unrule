import { RuleContext } from "@/src/hooks/ruleProvider";
import { getAllHistory, getAllRules } from "@/src/services/rules";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";


const DataInfo = () => {
  const { rules, representationDate } = useContext(RuleContext);
  const [history, setHistory] = useState<any[]>([]);
  const [rawRules, setRawRules] = useState<any[]>([]);

  async function getData() {
    const data = await getAllHistory();
    setHistory(data);
    const rawData = await getAllRules();
    setRawRules(rawData);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <ScrollView>
        <View>
          <Text>Data Info Component</Text>
        </View>
        <View>
          <Text>Rules</Text>
          <Text>{JSON.stringify(rawRules, null, 2)}</Text>
        </View>
        <View>
          <Text>History</Text>
          <Text>{JSON.stringify(history, null, 2)}</Text>
        </View>
        <View>
          <Text>RuleListInfo</Text>
          <Text>{JSON.stringify(rules, null, 2)}</Text>
        </View>
        <View>
          <Text> Data selecionada </Text>
          <Text>
            {representationDate.toDateString()}/
            {representationDate.toISOString()}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DataInfo;
