import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';

function LoginInput({placeholder, name}) {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={
        <Icon name={name} style={styles.marginRight} size={20} color="black" />
      }
    />
  );
}

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <View style={styles.inputWrapper}>
        <LoginInput placeholder="이메일" name="email" />
        <LoginInput placeholder="패스워드" name="lock" />
      </View>
      <View>
        <Button
          buttonStyle={{backgroundColor: '#357a38'}}
          style={styles.buttonLogin}
          title="로그인"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          buttonStyle={{backgroundColor: '#357a38'}}
          style={styles.buttonLogin}
          title="회원가입"
          onPress={() => navigation.navigate('Join')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    width: 250,
  },
  marginRight: {
    marginRight: 5,
  },
  buttonLogin: {
    width: 240,
    marginBottom: 5,
  },
});

export default LoginScreen;
