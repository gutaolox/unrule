import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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

export default function CreateRule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Rule>();
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  const toggleWeekDay = (id: number, value: boolean) => {
    const copy = [...selectedWeekDays];
    const updatedDays = !value
      ? copy.filter((day) => day !== id)
      : [...copy, id];
    setSelectedWeekDays(updatedDays);
    return updatedDays;
  };

  const onSubmit = (data: Rule) => {
    console.log(data);
    // Aqui você pode adicionar a lógica para salvar a regra no banco de dados
  };

  return (
    <View style={styles.container}>
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
          />
        )}
      />

      {errors.name && (
        <Text style={styles.error}>Esse campo é obrigatorio</Text>
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
          />
        )}
      />

      {/* <Text style={styles.label}>Active</Text>
      <Controller
        control={control}
        name="active"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChange(text === "true")}
            value={value ? "true" : "false"}
          />
        )}
      /> */}
      <Text style={styles.label}>Frequencia</Text>
      <Controller
        control={control}
        name="frequencyType"
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectedFormatted
            value={value}
            onChange={onChange}
            options={FrequencyType}
          />
        )}
      />
      <If
        condition={
          getValues("frequencyType") === FrequencyType.Weekly ||
          !getValues("frequencyType")
        }
      >
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
                  <Text>{day.name}</Text>
                </View>
              ))}
            </View>
          )}
        />
      </If>
      {/* <Text style={styles.label}>Days in Month</Text>
      <Controller
        control={control}
        name="daysInMonth"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(text) =>
              onChange(text.split(",").map((date) => new Date(date)))
            }
            value={value
              .map((date) => date.toISOString().split("T")[0])
              .join(",")}
          />
        )}
      /> */}

      <Text style={styles.label}>Horario do dia</Text>
      <Controller
        control={control}
        name="timeOfTheDay"
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectedFormatted
            value={value}
            onChange={onChange}
            options={TimeOfTheDay}
          />
        )}
      />

      {/* <Text style={styles.label}>Rule Type</Text>
      <Controller
        control={control}
        name="ruleType"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Target Value</Text>
      <Controller
        control={control}
        name="targetValue"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      /> */}

      {/* <Text style={styles.label}>Listing Position</Text>
      <Controller
        control={control}
        name="listingPosition"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(text) => onChange(parseInt(text))}
            value={value.toString()}
          />
        )}
      /> */}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
});
