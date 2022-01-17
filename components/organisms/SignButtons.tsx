import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../../libs/Colors";
import { AuthStackParamList } from "../../navigation/AuthStack";
import BasicButton from "../molecules/BasicButton";
import SpinLoading from "../molecules/SpinLoading";

interface Props {
  isSignUp: boolean;
  loading: boolean;
  onSubmit: () => void;
}

function SignButtons({ isSignUp, loading, onSubmit }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "Sign">>();

  const primaryTitle = isSignUp ? "회원가입" : "로그인";
  const secondaryTitle = isSignUp ? "로그인" : "회원가입";

  return (
    <View style={{ height: 76 }}>
      {loading ? (
        <SpinLoading />
      ) : (
        <>
          <BasicButton width={240} title={primaryTitle} onPress={onSubmit} />
          <BasicButton
            width={240}
            title={secondaryTitle}
            onPress={() =>
              isSignUp
                ? navigation.goBack()
                : navigation.push("Sign", { isSignUp: true })
            }
          />
          {!isSignUp && (
            <View style={styles.forgotPassword}>
              <Text>비밀번호를 잊어버리셨나요? </Text>
              <Pressable onPress={() => navigation.push("ForgotPassword")}>
                <Text style={styles.underline}>비밀번호 찾기</Text>
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    flexDirection: "row",
  },
  underline: {
    textDecorationLine: "underline",
  },
});

export default SignButtons;
