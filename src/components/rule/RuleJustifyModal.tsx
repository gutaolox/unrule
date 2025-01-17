import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import If from "../utils/If";
import DropdownSelector from "../utils/DropdownSelector";
import { set } from "react-hook-form";
import { SaveHistoryProps } from "@/src/entity/ruleBase";

interface RuleJustifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SaveHistoryProps;
}

const RuleJustifyModal: React.FC<RuleJustifyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAddingJustification, setIsAddingJustification] =
    useState<boolean>(false);
  const [justification, setJustification] = useState<string>("");
  return (
    <Modal visible={isOpen} animationType="slide" onDismiss={onClose}>
      <View style={{ display: "flex", justifyContent: "space-between" }}>
        <Text>Justificação</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.modalContainer}>
        <If condition={isAddingJustification}>
          <TextInput
            placeholder="Justificação"
            style={styles.modalText}
            onChange={(e) => console.log(e.nativeEvent.text)}
          />
          <Button
            title="Adicionar"
            onPress={() => setIsAddingJustification(false)}
          />
        </If>
        <If condition={!isAddingJustification}>
          <DropdownSelector
            data={[]}
            onSelect={(value: string) => {
              setJustification(value);
            }}
          />
          <Button title="Save" onPress={} />
        </If>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default RuleJustifyModal;
