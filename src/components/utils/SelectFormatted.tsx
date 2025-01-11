import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import React from "react";
import { View, Text } from "react-native";

export interface SelectFormattedProps {
  value: string;
  onChange: (value: string) => void;
  options: { [key: string]: string };
}

const SelectedFormatted: React.FC<SelectFormattedProps> = (props) => {
  return (
    <Select
      selectedValue={props.value}
      onValueChange={(valueSelected) => {
        props.onChange(valueSelected);
      }}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {Object.values(props.options).map((type) => (
            <SelectItem key={type} label={type} value={type} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectedFormatted;
