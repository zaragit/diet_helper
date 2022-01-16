import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomTextInput from "../molecules/CustomTextInput";
import Colors from "../../libs/Colors";
import EntypoIcon from "../atoms/EntypoIcon";

interface Props {
  form: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  isSignUp: boolean;
  createChangeTextHandler: (name: string) => (value: string) => void;
}

function SignForm({ form, isSignUp, createChangeTextHandler }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View>
      <CustomTextInput
        width={240}
        text={form.email}
        onChangeText={createChangeTextHandler("email")}
        placeholder="이메일"
        containerStyle={styles.distance}
        leftIcon={<EntypoIcon name="email" color={Colors.BLACK} />}
      />
      <CustomTextInput
        width={240}
        text={form.password}
        onChangeText={createChangeTextHandler("password")}
        placeholder="패스워드"
        containerStyle={styles.distance}
        secureTextEntry={!showPassword}
        leftIcon={<EntypoIcon name="lock" color={Colors.BLACK} />}
        rightIcon={
          <EntypoIcon
            name="eye-with-line"
            color={showPassword ? Colors.GRAY : Colors.BLACK}
          />
        }
        onRightIconPress={() => setShowPassword(!showPassword)}
      />
      {isSignUp && (
        <CustomTextInput
          width={240}
          text={form.confirmPassword}
          onChangeText={createChangeTextHandler("confirmPassword")}
          placeholder="패스워드 확인"
          containerStyle={styles.distance}
          secureTextEntry={!showConfirmPassword}
          leftIcon={<EntypoIcon name="lock" color={Colors.BLACK} />}
          rightIcon={
            <EntypoIcon
              name="eye-with-line"
              color={showConfirmPassword ? Colors.GRAY : Colors.BLACK}
            />
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  distance: { marginBottom: 16 },
  icon: {
    height: 38,
    width: 38,
    padding: 10,
    alignItems: "center",
  },
});

export default SignForm;
