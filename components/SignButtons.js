import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

const SignButtons = ({isSignUp, onSubmit, loading}) => {
  const navigation = useNavigation();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('Sign', {isSignUp: true});
    }
  };

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      <Button
        buttonStyle={{backgroundColor: '#357a38'}}
        style={styles.buttonLogin}
        title={primaryTitle}
        onPress={onSubmit}
      />
      <Button
        buttonStyle={{backgroundColor: '#357a38'}}
        style={styles.buttonLogin}
        title={secondaryTitle}
        onPress={onSecondaryButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignButtons;
