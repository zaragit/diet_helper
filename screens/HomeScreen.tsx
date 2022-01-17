import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "../components/molecules/BasicButton";
import { signOut } from "../libs/Auth";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <BasicButton width={100} title="로그아웃" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
