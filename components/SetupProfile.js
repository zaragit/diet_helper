import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import {Button, ButtonGroup, Input} from 'react-native-elements';

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

export default function SetupProfile() {
  const navigation = useNavigation();
  const {params} = useRoute();

  const {setUser} = useUserContext();
  const {uid} = params || {};

  const [profile, setProfile] = useState({
    displayName: null,
    age: null,
    height: null,
    weight: null,
    gender: 0,
  });

  const createChangeProfileHandler = useCallback(
    (name, numeric) => value =>
      setProfile({
        ...profile,
        [name]: numeric ? value.replace(/[^0-9]/g, '') : value,
      }),
    [profile],
  );

  const onSubmit = useCallback(() => {
    const {displayName, age, height, weight} = profile;

    if (!displayName || !age || !height || !weight) {
      Alert.alert('실패', '입력되지 않은 항목이 존재합니다.');
      return;
    }

    const newProfile = {
      id: uid,
      displayName,
      age,
      height,
      weight,
    };

    createUser(newProfile);
    setUser(newProfile);
  }, [profile, setUser, uid]);

  const onCancel = useCallback(() => {
    signOut();
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.profileForm}>
      <ButtonGroup
        onPress={createChangeProfileHandler('gender')}
        selectedIndex={profile.gender}
        buttons={genderData.map((data, index) => ({
          element: () => (
            <Text style={index === profile.gender && styles.whiteFont}>
              {data.label}
            </Text>
          ),
        }))}
        containerStyle={styles.select}
        buttonStyle={styles.disabledButton}
        selectedButtonStyle={styles.selectedButton}
      />

      <Input
        placeholder="이름(닉네임)"
        value={profile.displayName}
        inputContainerStyle={styles.input}
        onChangeText={createChangeProfileHandler('displayName')}
      />

      <Input
        placeholder="나이"
        value={profile.age}
        inputContainerStyle={styles.input}
        rightIcon={<Text>세(만)</Text>}
        keyboardType="numeric"
        onChangeText={createChangeProfileHandler('age', true)}
      />

      <Input
        placeholder="키"
        value={profile.height}
        inputContainerStyle={styles.input}
        rightIcon={<Text>cm</Text>}
        keyboardType="numeric"
        onChangeText={createChangeProfileHandler('height', true)}
      />

      <Input
        placeholder="몸무게"
        value={profile.weight}
        inputContainerStyle={styles.input}
        rightIcon={<Text>kg</Text>}
        keyboardType="numeric"
        onChangeText={createChangeProfileHandler('weight', true)}
      />

      <View style={styles.stepButtonWrapper}>
        <Button style={styles.stepButton} title="취소" onPress={onCancel} />
        <Button style={styles.stepButton} title="다음" onPress={onSubmit} />
      </View>
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
