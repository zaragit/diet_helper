import React from "react";
import { StyleSheet, View } from "react-native";
import TitleHeader from "./TitleHeader";

function Loading() {
  return (
    <View style={styles.wrapper}>
      <TitleHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
