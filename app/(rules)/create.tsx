import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  FrequencyType,
  Rule,
  TimeOfTheDay,
  weekDaysOptions,
} from "@/src/entity/ruleBase";
import { Checkbox } from "@/components/ui/checkbox";
import SelectedFormatted from "@/src/components/utils/SelectFormatted";
import CheckBoxControl from "@/src/components/utils/CheckBoxControl";
import If from "@/src/components/utils/If";
import { RuleContext } from "@/src/hooks/ruleProvider";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import { InternacionalizationContext } from "@/src/hooks/internacionalizationProvider";
import TextTranslated from "@/src/components/utils/TextTranslated";
import DaySelector from "@/src/components/utils/MonthSelector";

export default function CreateRule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Rule>();
  const { createRuleService } = useContext(RuleContext);
  const { getMessage } = useContext(InternacionalizationContext);
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  const frequencyTypeValue = watch("frequencyType", FrequencyType.Weekly);

  const toggleWeekDay = (id: number, value: boolean) => {
    const copy = [...selectedWeekDays];
    const updatedDays = !value
      ? copy.filter((day) => day !== id)
      : [...copy, id];
    setSelectedWeekDays(updatedDays);
    return updatedDays;
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: Rule) => {
    createRuleService(data);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextTranslated style={styles.label}>RuleName</TextTranslated>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Digite o nome"
          />
        )}
      />
      {errors.name && (
        <TextTranslated style={styles.error}>RequiredField</TextTranslated>
      )}

      {/* <TextTranslated style={styles.label}>Description</TextTranslated>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Digite a descrição"
          />
        )}
      /> */}

      <TextTranslated style={styles.label}>HowOften</TextTranslated>
      <Controller
        control={control}
        name="frequencyType"
        defaultValue={FrequencyType.Weekly}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectedFormatted
            value={value}
            onChange={onChange}
            options={FrequencyType}
            defaultValue={FrequencyType.Weekly}
            style={styles.select}
          />
        )}
      />

      <If condition={frequencyTypeValue === FrequencyType.Weekly}>
        <TextTranslated style={styles.label}>DaysOfWeek</TextTranslated>
        <Controller
          control={control}
          name="weekDays"
          render={({ field: { onChange } }) => (
            <View>
              {weekDaysOptions.map((day) => (
                <View key={day.id} style={styles.checkboxContainer}>
                  <CheckBoxControl
                    value={day.id.toString()}
                    onCheck={(valueCheckbox) => {
                      const newDays = toggleWeekDay(day.id, valueCheckbox);
                      onChange(newDays);
                    }}
                  />
                  <TextTranslated style={styles.checkboxLabel}>
                    {day.name}
                  </TextTranslated>
                </View>
              ))}
            </View>
          )}
        />
      </If>

      <If condition={frequencyTypeValue === FrequencyType.Monthly}>
        <Controller
          control={control}
          name="daysInMonth"
          defaultValue={[]}
          render={({ field: { onChange, onBlur, value } }) => (
            <DaySelector
              onSelectDay={(days) => {
                onChange(days);
              }}
              selectedDays={value}
            />
          )}
        />
      </If>

      <TextTranslated style={styles.label}>TimeOfDay</TextTranslated>
      <Controller
        control={control}
        name="timeOfTheDay"
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectedFormatted
            value={value}
            onChange={onChange}
            options={TimeOfTheDay}
            style={styles.select}
          />
        )}
      />

      <Button
        title={getMessage("Send") ?? "Send"}
        onPress={handleSubmit(onSubmit)}
        color="#6200ee"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  select: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});
