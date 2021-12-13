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
