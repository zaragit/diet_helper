import React from "react";
import { StyleSheet, View } from "react-native";
import TitleHeader from "./TitleHeader";

function Loading() {
  return (
    <View style={styles.wrapper}>
      <TitleHeader animation={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
