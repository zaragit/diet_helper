import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CONTAINER_WIDTH = 270;
const CONTAINER_HEIGHT = 360;
const DEFAULT_PADDING = 10;
const FONT_SIZE = 16;

function PageTransitionButton({
  name,
  onPress,
}: {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.padding} onPress={onPress}>
      <Ionicons name={name} size={FONT_SIZE} />
    </Pressable>
  );
}

interface Props {
  onNextPress: () => void;
  onPreviousPress: () => void;
  renderHeader: () => React.ReactNode;
  children: React.ReactNode;
}

function Layout({
  onNextPress,
  onPreviousPress,
  renderHeader,
  children,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.flexRow, styles.headerContainer]}>
        <PageTransitionButton name="caret-back" onPress={onPreviousPress} />
        {renderHeader()}
        <PageTransitionButton name="caret-forward" onPress={onNextPress} />
      </View>
      <View style={styles.bodyContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    width: CONTAINER_WIDTH - 10,
    height: 37.5,
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
  },
  bodyContainer: {
    marginTop: DEFAULT_PADDING * 2,
    width: CONTAINER_WIDTH - 10,
  },
  padding: {
    padding: DEFAULT_PADDING,
  },
});

export default Layout;
