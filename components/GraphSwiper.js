import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import MainCalorieProgress from './MainCalorieProgress';
import WaveTest from './WaveTest';

export default function GraphSwiper({calorie}) {
  return (
    <Swiper style={styles.wrapper} showsButtons loop={false}>
      <View testID="Hello" style={styles.slide1}>
        <Text style={styles.text}>Calorie</Text>
        <MainCalorieProgress calorie={calorie} />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
