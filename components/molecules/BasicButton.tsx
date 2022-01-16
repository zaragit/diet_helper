import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../../libs/Colors";

interface Props {
  title: string;
  width?: number;
  height?: number;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

function BasicButton({
  title,
  width = useWindowDimensions().width - 200,
  height = 38,
  onPress,
  containerStyle,
}: Props) {
  return (
    <View style={[styles.container, styles.margin, containerStyle]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          Platform.OS === "ios" && pressed && { opacity: 0.5 },
          { width, height },
        ]}
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.BLACK,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    padding: 10,
    color: Colors.WHITE,
  },
  margin: {
    marginBottom: 16,
  },
});

export default BasicButton;
