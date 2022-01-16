import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "../components/molecules/BasicButton";
import Colors from "../libs/Colors";
import SignForm from "../components/organisms/SignForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import TitleHeader from "../components/molecules/TitleHeader";
import SignButtons from "../components/organisms/SignButtons";

type Props = NativeStackScreenProps<AuthStackParamList, "Sign">;

function SignScreen({ navigation, route }: Props) {
  const { isSignUp } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader />
      <SignForm
        form={form}
        createChangeTextHandler={createChangeTextHandler}
        isSignUp={isSignUp}
      />
      <SignButtons loading={loading} isSignUp={isSignUp} onSubmit={onSubmit} />
    </SafeAreaView>
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

export default SignScreen;
