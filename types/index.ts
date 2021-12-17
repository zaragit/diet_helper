import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type Styles = ViewStyle | TextStyle | ImageStyle;

export type StyleProps = {[key: string]: Styles};

export type WaveProps = {
  A: number;
  T: number;
  fill: String;
};

export type Form = {
  email: string;
  password: string;
  confirmPassword: string;
};

export enum Activity {
  LOW = 0,
  LITTLE_LOW = 1,
  MEDIUM = 2,
  LITTLE_HIGH = 3,
  HIGH = 4,
}

export enum Intensity {
  WEAK = 0,
  MEDIUM = 1,
  STRONG = 2,
}

export type ErrorMessage = string;

export type UserProfile = {
  displayName: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: 0 | 1;
  activity: Activity;
  intensity: Intensity;
};
