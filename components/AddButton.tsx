import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TABBAR_HEIGHT = 49;

export default function AddButton() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.wrapper, {bottom: TABBAR_HEIGHT / 2 + insets.bottom - 4}]}>
      <Pressable style={styles.circle}>
        <Icon name="add" color="white" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -27,
      },
    ],
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  circle: {
    backgroundColor: '#834bff',
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
