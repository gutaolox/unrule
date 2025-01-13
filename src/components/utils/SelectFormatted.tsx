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
import { InternacionalizationContext } from "@/src/hooks/internacionalizationProvider";
import React, { useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface SelectFormattedProps {
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  options: { [key: string]: string };
  style: StyleProp<ViewStyle>;
}

const SelectedFormatted: React.FC<SelectFormattedProps> = (props) => {
  const { getMessage } = useContext(InternacionalizationContext);
  return (
    <Select
      selectedValue={props.value}
      onValueChange={(valueSelected) => {
        props.onChange(valueSelected);
      }}
      defaultValue={props.defaultValue}
      initialLabel={
        getMessage(props.defaultValue ?? "") || getMessage("SelectOption")
      }
      style={props.style}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput style={{ height: 50 }} placeholder="Select option" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {Object.values(props.options).map((type) => (
            <SelectItem
              key={type}
              label={getMessage(type) ?? type}
              value={type}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectedFormatted;
