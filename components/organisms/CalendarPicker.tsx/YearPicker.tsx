import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../libs/Colors";
import Layout from "./Layout";

interface Props {
  date: Date;
  onChange: (date: Date) => void;
}

function YearPicker({ date, onChange }: Props) {
  const year = date.getFullYear();
  const [startYear, setStartYear] = useState(year - (year % 10));
  const headerText = `${startYear - 1} - ${startYear + 10}`;

  return (
    <Layout
      onNextPress={() => setStartYear(startYear + 10)}
      onPreviousPress={() => setStartYear(startYear - 10)}
      renderHeader={() => (
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
      )}
    >
      {new Array(3).fill(0).map((_, i) => (
        <View style={styles.flexRow}>
          {new Array(4).fill(0).map((_, j) => {
            const printYear = startYear + 4 * i + (j - 1);
            return (
              <Pressable
                style={[styles.button, printYear === year && styles.selected]}
                onPress={() => {
                  date.setFullYear(printYear);
                  onChange(date);
                }}
              >
                <Text style={printYear === year && styles.selectedText}>
                  {printYear}
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

export default YearPicker;
