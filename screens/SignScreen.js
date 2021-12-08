import React, {useCallback, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import {useUserContext} from '../contexts/UserContext';
import {signIn, signUp} from '../lib/auth';
import {getUser} from '../lib/users';

/**
 * 로그인, 회원가입 화면
 */
export default function SignScreen({navigation, route}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState();

  const {isSignUp} = route.params ?? {};
  const {setUser} = useUserContext();

  const createChangeTextHandler = useCallback(
    name => value => {
      setForm({...form, [name]: value});
    },
    [form],
  );

  const onSubmit = useCallback(async () => {
    Keyboard.dismiss();

    const {email, password, confirmPassword} = form;

    // 회원가입 화면에서 (비밀번호, 비밀번호 확인) 불일치 확인
    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setLoading(true);

      const info = {email, password};
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      const profile = await getUser(user.uid);

      /**
       * 프로필 설정 or 로그인
       */
      profile
        ? setUser(profile)
        : navigation.navigate('Welcome', {uid: user.uid});
    } catch ({code}) {
      Alert.alert('실패', getErrorMassage(code, isSignUp));
    } finally {
      setLoading(false);
    }
  }, [form, isSignUp, navigation, setUser]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.appName}>Diper</Text>
        <SignForm
          form={form}
          isSignUp={isSignUp}
          onSubmit={onSubmit}
          createChangeTextHandler={createChangeTextHandler}
        />
        <SignButtons
          isSignUp={isSignUp}
          onSubmit={onSubmit}
          loading={loading}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * 에러 코드에 따라 적절한 출력 메시지를 반환하는 메소드
 *
 * @param {*} code - Error 코드
 * @param {*} isSignUp - 로그인 화면
 * @returns - 출력 메시지
 */
const getErrorMassage = (code, isSignUp) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return '이미 가입된 이메일입니다.';
    case 'auth/wrong-password':
      return '잘못된 비밀번호입니다.';
    case 'auth/user-root-found':
      return '존재하지 않는 계정입니다.';
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 주소입니다.';
    default:
      return `${isSignUp ? '가입' : '로그인'} 실패`;
  }
};
