import React, {useMemo} from 'react';
import {View} from 'react-native';
import {ButtonGroup, CheckBox, Text} from 'react-native-elements';
import {Activity, UserProfile} from '../types';

interface Props {
  profile: UserProfile;
  createChangeProfileHandler: (name: string) => (value: Activity) => void;
}

export default function SetupActivity({
  profile,
  createChangeProfileHandler,
}: Props) {
  const changeProfileActivity = useMemo(
    () => createChangeProfileHandler('activity'),
    [],
  );

  const onChangeIndex = (index: Activity) => {
    changeProfileActivity(index);
  };

  return (
    <View>
      <Text>당신의 활동량은 어느정도 인가요?</Text>
      <ButtonGroup
        selectedIndex={profile.activity}
        onPress={onChangeIndex}
        buttons={[
          <Text>낮음</Text>,
          <Text>조금 낮음</Text>,
          <Text>중간</Text>,
          <Text>조금 높음</Text>,
          <Text>높음</Text>,
        ]}
      />
    </View>
  );
}
