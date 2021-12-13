import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {RootStackNavigationProp} from '../screens/RootStack';

interface Props {
  isSignUp: boolean;
  onSubmit: () => void;
  loading: boolean;
}

export default function SignButtons({isSignUp, onSubmit, loading}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = useCallback(
    () =>
      isSignUp
        ? navigation.goBack()
        : navigation.push('Sign', {isSignUp: true}),
    [isSignUp, navigation],
  );

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#357a38" />
      </View>
    );
  }

  return (
    <View style={styles.buttonWrapper}>
      <Button
        title={primaryTitle}
        style={styles.button}
        buttonStyle={styles.buttonColor}
        onPress={onSubmit}
      />
      <Button
        title={secondaryTitle}
        style={styles.button}
        buttonStyle={styles.buttonColor}
        onPress={onSecondaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 240,
  },
  button: {
    marginBottom: 10,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonColor: {
    backgroundColor: '#357a38',
  },
});
