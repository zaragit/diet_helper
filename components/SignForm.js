import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomInput from './CustomInput';

const SignForm = ({isSignUp, onSubmit, form, createChangeTextHandler}) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <View style={styles.inputWrapper}>
        <CustomInput
          placeholder="이메일"
          name="email"
          value={form.email}
          onChangeText={createChangeTextHandler('email')}
          onSubmitEditing={() => passwordRef.current.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="next"
        />
        <CustomInput
          placeholder="비밀번호"
          name="lock"
          value={form.password}
          ref={passwordRef}
          onChangeText={createChangeTextHandler('password')}
          secureTextEntry
          onSubmitEditing={() => {
            if (isSignUp) {
              confirmPasswordRef.current.focus();
            } else {
              onSubmit();
            }
          }}
        />
        {isSignUp && (
          <CustomInput
            name="lock"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            ref={confirmPasswordRef}
            secureTextEntry
            onChangeText={createChangeTextHandler('confirmPassword')}
            onSubmitEditing={onSubmit}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: 270,
    marginBottom: 10,
  },
  buttonLogin: {
    width: 260,
    marginBottom: 10,
  },
});

export default SignForm;
