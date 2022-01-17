import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../../libs/Colors";

function SpinLoading() {
  return (
    <View style={[styles.wrapper]}>
      <ActivityIndicator size={32} color={Colors.BLACK} />
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

export default SpinLoading;
