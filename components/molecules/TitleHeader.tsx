import { StyleSheet, Text, View } from "react-native";
import Colors from "../../libs/Colors";

function TitleHeader() {
  return (
    <View style={styles.title}>
      <Text style={[styles.titleWord, { color: Colors.LIGHT_BLUE }]}>탄</Text>
      <Text style={[styles.titleWord, { color: Colors.LIGHT_RED }]}>단</Text>
      <Text style={[styles.titleWord, { color: Colors.LIGHT_YELLOW }]}>지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  title: {
    flexDirection: "row",
  },
  titleWord: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 6,
  },
  distance: { marginBottom: 16 },
  icon: {
    height: 38,
    width: 38,
    padding: 10,
    alignItems: "center",
  },
});

export default TitleHeader;
