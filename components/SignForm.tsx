import React, {useEffect, useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Form} from '../types';

interface Props {
  isSignUp: boolean;
  onSubmit: () => void;
  form: Form;
  createChangeTextHandler: (name: string) => (value: string) => void;
}

export default function SignForm({
  isSignUp,
  onSubmit,
  form,
  createChangeTextHandler,
}: Props) {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <>
      <View style={styles.inputWrapper}>
        <Input
          placeholder="이메일"
          leftIcon={
            <Icon
              name="email"
              style={styles.marginRight}
              size={20}
              color="black"
            />
          }
          onChangeText={createChangeTextHandler('email')}
          value={form.email}
          onSubmitEditing={() => passwordRef.current?.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="next"
        />
        <Input
          placeholder="비밀번호"
          leftIcon={
            <Icon
              name="lock"
              style={styles.marginRight}
              size={20}
              color="black"
            />
          }
          onChangeText={createChangeTextHandler('password')}
          value={form.password}
          ref={passwordRef}
          onSubmitEditing={() => {
            if (isSignUp) {
              confirmPasswordRef.current?.focus();
            } else {
              onSubmit();
            }
          }}
          secureTextEntry
          autoCompleteType="password"
        />
        {isSignUp && (
          <Input
            placeholder="비밀번호 확인"
            leftIcon={
              <Icon
                name="lock"
                style={styles.marginRight}
                size={20}
                color="black"
              />
            }
            onChangeText={createChangeTextHandler('confirmPassword')}
            value={form.confirmPassword}
            ref={confirmPasswordRef}
            onSubmitEditing={onSubmit}
            secureTextEntry
            autoCompleteType="password"
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: 270,
  },
  marginRight: {
    marginRight: 5,
  },
});
