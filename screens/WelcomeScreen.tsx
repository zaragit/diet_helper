import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SetupIntensity from '../components/SetupIntensity';
import SetupProfile from '../components/SetupProfile';
import {Intensity, UserProfile} from '../types';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import SetupActivity from '../components/SetupActivity';

export default function WelcomeScreen() {
  const [errors, setErrors] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>({
    displayName: null,
    age: null,
    height: null,
    weight: null,
    gender: 0,
    activity: 1,
    intensity: Intensity.WEAK,
  });

  const checkBlank = () => {};

  const createChangeProfileHandler = useCallback(
    (name: string) => (value: string | number) =>
      setProfile({
        ...profile,
        [name]:
          typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value,
      }),
    [profile],
  );

  const onNext = (activeStep?: number) => {
    switch (activeStep) {
      case 0:
        console.log('Step2');
        break;
      case 1:
        console.log('Step3');
        break;
      case 2:
        console.log('submit');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ProgressSteps>
        <ProgressStep onNext={onNext} errors={errors}>
          <View style={{alignItems: 'center'}}>
            <SetupProfile
              profile={profile}
              createChangeProfileHandler={createChangeProfileHandler}
            />
          </View>
        </ProgressStep>
        <ProgressStep onNext={onNext}>
          <View style={{alignItems: 'center'}}>
            <SetupActivity
              profile={profile}
              createChangeProfileHandler={createChangeProfileHandler}
            />
          </View>
        </ProgressStep>
        <ProgressStep onSubmit={onNext}>
          <View style={{alignItems: 'center'}}>
            <SetupIntensity
              profile={profile}
              createChangeProfileHandler={createChangeProfileHandler}
            />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 100,
    paddingBottom: 100,
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 18,
    marginTop: 5,
  },
  stepButton: {},
});
