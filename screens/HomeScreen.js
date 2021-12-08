import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';

export default function HomeScreen({navigation}) {
  const {setUser} = useUserContext();

  return (
    <View>
      <Text>HomeScreen</Text>
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
