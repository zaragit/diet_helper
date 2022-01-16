import React from "react";
import { Entypo } from "@expo/vector-icons";
import { OpaqueColorValue, StyleSheet } from "react-native";

interface Props {
  name: keyof typeof Entypo.glyphMap;
  color?: string | OpaqueColorValue | undefined;
}

function EntypoIcon({ name, color }: Props) {
  return <Entypo style={styles.icon} name={name} size={18} color={color} />;
}

const styles = StyleSheet.create({
  icon: {
    height: 38,
    width: 38,
    padding: 10,
    alignItems: "center",
  },
});

export default EntypoIcon;
