import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, Text, View} from 'react-native';

export default function SettingScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>SettingScreen</Text>
      <Button title="로그인 화면" onPress={() => navigation.navigate('Sign')} />
    </View>
  );
}
