import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function BlockView({children, style}) {
  return <View style={[styles.block, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  block: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
