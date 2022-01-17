import React, { useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "../components/molecules/BasicButton";
import Colors from "../libs/Colors";
import SignForm from "../components/organisms/SignForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import TitleHeader from "../components/molecules/TitleHeader";
import SignButtons from "../components/organisms/SignButtons";
import { signIn, signUp } from "../libs/Auth";
import { getProfileByUid } from "../libs/Profile";
import { useAuthContext } from "../contexts/AuthContext";

const getErrorMassage = (code: string, isSignUp: boolean) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "이미 가입된 이메일입니다.";
    case "auth/wrong-password":
      return "잘못된 비밀번호입니다.";
    case "auth/user-root-found":
      return "존재하지 않는 계정입니다.";
    case "auth/invalid-email":
      return "유효하지 않은 이메일 주소입니다.";
    default:
      return `${isSignUp ? "가입" : "로그인"} 실패`;
  }
};

type Props = NativeStackScreenProps<AuthStackParamList, "Sign">;

function SignScreen({ navigation, route }: Props) {
  const { setProfile } = useAuthContext();
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

  const onSubmit = async () => {
    Keyboard.dismiss();

    const { email, password } = form;

    setLoading(true);

    try {
      const { uid } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      const profile = await getProfileByUid(uid);

      if (profile) {
        setProfile(profile);
      } else {
        navigation.navigate("Welcome");
      }
    } catch (e: any) {
      Alert.alert("실패", getErrorMassage(e, isSignUp));
    } finally {
      setLoading(false);
    }
  };

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
