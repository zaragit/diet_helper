import React, {useMemo} from 'react';
import {View} from 'react-native';
import {ButtonGroup, Text} from 'react-native-elements';
import {Intensity, UserProfile} from '../types';

interface Props {
  profile: UserProfile;
  createChangeProfileHandler: (name: string) => (value: Intensity) => void;
}

export default function SetupIntensity({
  profile,
  createChangeProfileHandler,
}: Props) {
  const changeProfileIntensity = useMemo(
    () => createChangeProfileHandler('intensity'),
    [],
  );

  const onChangeIndex = (index: Intensity) => {
    changeProfileIntensity(index);
  };

  return (
    <View>
      <Text>감량 강도를 설정합니다.</Text>
      <ButtonGroup
        selectedIndex={profile.intensity}
        onPress={onChangeIndex}
        buttons={[<Text>약</Text>, <Text>중</Text>, <Text>강</Text>]}
      />
    </View>
  );
}
