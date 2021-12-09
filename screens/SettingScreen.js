import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';

export default function SettingScreen() {
  const navigation = useNavigation();
  const {setUser} = useUserContext();

  return (
    <View>
      <Text>SettingScreen</Text>
      <Button title="로그인 화면" onPress={() => navigation.navigate('Sign')} />

      <Button
        title="로그아웃"
        onPress={() => {
          signOut();
          setUser(null);
        }}
      />
    </View>
  );
}
