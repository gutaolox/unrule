import React, { act, useContext, useRef, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import RuleCard from "./RuleCard";
import { RuleContext } from "@/src/hooks/ruleProvider";
import { RuleListInfo } from "@/src/entity/ruleBase";
import { router } from "expo-router";

const RuleList: React.FC = () => {
  const { rules, setRules, resetData, representationDate } =
    useContext(RuleContext);
  const scrollViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    resetData();
    setRefreshing(false);
  };

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
    // updateOrderService(
    //   copy.map((rule) => ({
    //     id: rule.id,
    //     listingPosition: rule.listingPosition,
    //   }))

    // );
    //Colocara no useEffect para não ficar chamando toda hora
    // fazer seleção de data
  }

  function renderItem(info: DragListRenderItemInfo<RuleListInfo>) {
    const { item, onDragStart, onDragEnd, isActive } = info;
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.item, isActive && styles.active]}
        onLongPress={onDragStart}
        onPressOut={onDragEnd}

        // onLongPress={() => {// melhorar forma de pressionar
        //   router.navigate({
        //     pathname: "/(rules)/details",
        //     params: {
        //       ...item,
        //       status: item.status ? 1 : 0,
        //       completionDate: item.completionDate?.toLocaleDateString(),
        //       active: item.active ? 1 : 0,
        //       representationDate: representationDate?.toLocaleDateString(),
        //     },
        //   });
        // }}
      >
        <RuleCard
          data={{
            ...item,
            representationDate,
          }}
        />
      </TouchableOpacity>
    );
  }

  function keyExtractor(item: RuleListInfo) {
    return item.id;
  }

  return (
    <View style={{ paddingBottom: 32 }}>
      <DragList
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  item: {
    minHeight: 50,
    marginVertical: 8,
  },
  active: {
    backgroundColor: "grey",
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default RuleList;
