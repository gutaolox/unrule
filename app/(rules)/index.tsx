import { Pressable, StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";
import RuleList from "@/src/components/rule/RuleList";
import DateSelection from "@/src/components/date/dateSelection";
import RuleCompletion from "@/src/components/rule/RuleCompletion";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* data anterior //// data de hoje/selecionada a de hoje é padrão se clicar pode selecionar a data ///// proxima data*/}
      {/* total de desafios de completados/ total de desafios */}
      {/* listagem de desafios */}
      <DateSelection />
      <RuleCompletion />
      
      <RuleList />
      <Link style={styles.floatingButton} href="/(rules)/create" asChild>
        <Pressable>
          <Text style={styles.floatingButtonText}>+</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    width: 60, 
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#4B0082",
    borderRadius: 30,
    elevation: 8,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
  },
});
