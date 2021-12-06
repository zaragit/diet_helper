import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, Text, View} from 'react-native';

export default function SettingScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>SettingScreen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
