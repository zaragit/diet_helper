import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import {Button, ButtonGroup, Input} from 'react-native-elements';
import {RootStackParamList} from '../screens/RootStack';
import {UserProfile} from '../types';

const genderData = [
  {
    value: 'male',
    label: '남자',
  },
  {
    value: 'female',
    label: '여자',
  },
];

type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

interface Props {
  profile: UserProfile;
  createChangeProfileHandler: (name: string) => (value: string) => void;
}

export default function SetupProfile({
  profile,
  createChangeProfileHandler,
}: Props) {
  return (
    <View style={styles.profileForm}>
      <ButtonGroup
        onPress={createChangeProfileHandler('gender')}
        selectedIndex={profile.gender}
        buttons={genderData.map((data, index) => (
          <Text style={index === profile.gender && styles.whiteFont}>
            {data.label}
          </Text>
        ))}
        containerStyle={styles.select}
        buttonStyle={styles.disabledButton}
        selectedButtonStyle={styles.selectedButton}
      />

      <Input
        placeholder="이름(닉네임)"
        value={profile.displayName || ''}
        inputContainerStyle={styles.input}
        onChangeText={createChangeProfileHandler('displayName')}
        autoCompleteType={undefined}
      />

      <Input
        placeholder="나이"
        value={profile.age?.toString()}
        inputContainerStyle={styles.input}
        rightIcon={<Text>세(만)</Text>}
        keyboardType="numeric"
        onChangeText={createChangeProfileHandler('age')}
        autoCompleteType={undefined}
      />

      <Input
        placeholder="키"
        value={profile.height?.toString()}
        inputContainerStyle={styles.input}
        rightIcon={<Text>cm</Text>}
        keyboardType="numeric"
        onChangeText={createChangeProfileHandler('height')}
        autoCompleteType={undefined}
      />

      <Input
        placeholder="몸무게"
        value={profile.weight?.toString()}
        inputContainerStyle={styles.input}
        rightIcon={<Text>kg</Text>}
        keyboardType="numeric"
        onChangeText={createChangeProfileHandler('weight')}
        autoCompleteType={undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileForm: {
    marginTop: 30,
    alignItems: 'center',
    width: 130,
  },
  input: {
    height: 30,
  },
  select: {
    marginBottom: 15,
    height: 30,
  },
  whiteFont: {
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#ffffff',
  },
  selectedButton: {
    backgroundColor: '#357a38',
    color: 'white',
  },
  stepButtonWrapper: {
    width: 200,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  stepButton: {
    marginLeft: 5,
    backgroundColor: '#357a38',
    color: 'white',
  },
});
