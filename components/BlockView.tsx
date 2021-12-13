import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StyleProps, Styles} from '../types';

export default function BlockView({
  style,
  children,
}: {
  style?: Styles[];
  children?: React.ReactNode;
}) {
  return <View style={[styles.block, style]}>{children}</View>;
}

const styles = StyleSheet.create<StyleProps>({
  block: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
