import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import RuleCard from "./RuleCard";
import { RuleContext } from "@/app/hooks/ruleProvider";
import { RuleListInfo } from "@/app/entity/ruleBase";

const RuleList: React.FC = () => {
  const { rules, setRules, updateOrderService } = useContext(RuleContext);
  function renderItem(info: DragListRenderItemInfo<RuleListInfo>) {
    const { item, onDragStart, onDragEnd, isActive } = info;
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.item, isActive && styles.active]}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
      >
        <RuleCard text={item.description} />
      </TouchableOpacity>
    );
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...rules]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    const next = copy[toIndex];
    const prev = copy[toIndex - 1];
    if (next) {
      removed[0].listingPosition = next.listingPosition - 1;
    } else if (prev) {
      removed[0].listingPosition = prev.listingPosition + 1;
    } else {
      removed[0].listingPosition = 1;
    }
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setRules(copy); 
    //arrumar sincronizacoa banco 
    // formulario de criacao de regra
    // fazer seleção de data 
  }

  function keyExtractor(item: RuleListInfo) {
    return item.id;
  }

  return (
    <View
      style={styles.container}>
      <DragList
        data={rules}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
  },
  item: {
    //backgroundColor: "gray",
    //borderWidth: 1,
    //borderColor: "black",
    minHeight: 50,
    marginVertical: 8,
    //paddingHorizontal: 16,
    //borderRadius: 8,
  },
  active: {
    backgroundColor: "grey",
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default RuleList;
