import React, { useContext, useEffect, useState } from "react";
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
import { SaveHistoryProps } from "@/src/entity/ruleBase";
import { RuleContext } from "@/src/hooks/ruleProvider";
import {
  createJustification,
  getJustifications,
} from "@/src/services/justification";
import { set } from "react-hook-form";

interface RuleJustifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SaveHistoryProps;
}

const RuleJustifyModal: React.FC<RuleJustifyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { selectedRule, saveHistoryService } = useContext(RuleContext);
  const [isAddingJustification, setIsAddingJustification] =
    useState<boolean>(false);
  const [newJustification, setNewJustification] = useState<string>();
  const [historyData, setHistoryData] = useState<SaveHistoryProps>();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  async function fetchOptions() {
    const options = await getJustifications();
    setOptions(
      options.map((option) => ({
        label: option.justification,
        value: option.id,
      }))
    );
  }

  async function onAddNewJustification(justification: string) {
    const newJustification = await createJustification(justification);
    setOptions([
      ...options,
      { label: newJustification.justification, value: newJustification.id },
    ]);
    if (!historyData) return;
    setHistoryData({ ...historyData, justificationId: newJustification.id });
  }

  useEffect(() => {
    fetchOptions();
    if (selectedRule) {
      setHistoryData({
        ruleId: selectedRule.id,
        representationDate: selectedRule.representationDate,
        status: selectedRule.status,
        justificationId: selectedRule.justificationId,
      });
    }
  }, [selectedRule]);

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
            value={newJustification}
            onChange={(e) => {
              setNewJustification(e.nativeEvent.text);
            }}
          />

          <Button
            title="Adicionar"
            onPress={() => {
              setIsAddingJustification(false);
              onAddNewJustification(newJustification ?? "");
            }}
          />
        </If>
        <If condition={!isAddingJustification}>
          <DropdownSelector
            data={options}
            value={historyData?.justificationId}
            onSelect={(value: string) => {
              if (!historyData) return;
              setHistoryData({ ...historyData, justificationId: value });
            }}
          />
          <View>
            <Button
              title="Adicionar justificativa"
              onPress={() => setIsAddingJustification(true)}
            />
            <Button
              title="Save"
              onPress={() => {
                if (!historyData) return;
                saveHistoryService(historyData);
              }}
            />
          </View>
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
