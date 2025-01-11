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

export default function CreateRule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Rule>();
  const { createRuleService } = useContext(RuleContext);
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
    const subscription = watch(
      (value, { name, type }) => {}
      //console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: Rule) => {
    console.log(data);
    createRuleService(data);
    router.back();
    // Aqui você pode adicionar a lógica para salvar a regra no banco de dados
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome</Text>
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
        <Text style={styles.error}>Esse campo é obrigatório</Text>
      )}

      <Text style={styles.label}>Descrição</Text>
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
      />

      <Text style={styles.label}>Frequência</Text>
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
        <Text style={styles.label}>Dias da semana</Text>
        <Controller
          control={control}
          name="weekDays"
          render={({ field: { onChange, onBlur, value } }) => (
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
                  <Text style={styles.checkboxLabel}>{day.name}</Text>
                </View>
              ))}
            </View>
          )}
        />
      </If>

      <Text style={styles.label}>Horário do dia</Text>
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

      <Button title="Enviar" onPress={handleSubmit(onSubmit)} color="#6200ee" />
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
