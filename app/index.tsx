import { Text, View } from "react-native";
import RuleCard from "./components/rule/RuleCard";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       {/* data anterior //// data de hoje/selecionada a de hoje é padrão se clicar pode selecionar a data ///// proxima data*/}
       {/* total de desafios de completados/ total de desafios */}
       {/* listagem de desafios */}
      <RuleCard text="teste"/>
    </View>
  );
}
