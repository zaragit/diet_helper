import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, Text, View} from 'react-native';

function JoinScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>JoinScreen</Text>
      <Button title="홈" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default JoinScreen;
