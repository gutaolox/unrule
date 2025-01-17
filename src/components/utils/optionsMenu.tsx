import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

interface OptionsMenuProps {
  options: {
    name: string;
    onClick: () => void;
  }[];
}

export default function OptionsMenu({ options }: OptionsMenuProps) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => setVisible(false);
  console.log(visible);
  return (
    <View>
      <Menu
        visible={visible}
        onRequestClose={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <MaterialIcons name="more-vert" size={24} color="grey" />
          </TouchableOpacity>
        }
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.name}
              onPress={() => {
                option.onClick();
                closeMenu();
              }}
            >
              {option.name}
            </MenuItem>
          );
        })}
      </Menu>
    </View>
  );
}
