import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../libs/Colors";
import Layout from "./Layout";

interface Props {
  date: Date;
  onChange: (date: Date, changeStep?: boolean) => void;
  changePreviousStep: () => void;
}

function MonthPicker({ date, onChange, changePreviousStep }: Props) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <Layout
      onNextPress={() => {
        date.setFullYear(year + 1);
        onChange(date, false);
      }}
      onPreviousPress={() => {
        date.setFullYear(year - 1);
        onChange(date, false);
      }}
      renderHeader={() => (
        <Pressable style={styles.header} onPress={changePreviousStep}>
          <Text style={styles.headerText}>{year}</Text>
        </Pressable>
      )}
    >
      {new Array(3).fill(0).map((_, i) => (
        <View style={styles.flexRow}>
          {new Array(4).fill(0).map((_, j) => {
            const printMonth = 4 * i + j + 1;
            return (
              <Pressable
                style={[styles.button, printMonth === month && styles.selected]}
                onPress={() => {
                  date.setMonth(printMonth - 1);
                  onChange(date);
                }}
              >
                <Text style={printMonth === month && styles.selectedText}>
                  {printMonth}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </Layout>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  header: {
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
  },
  button: {
    width: 66,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    borderRadius: 33,
    backgroundColor: Colors.BLACK,
  },
  selectedText: {
    color: Colors.WHITE,
  },
});

export default MonthPicker;
