import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import BlockView from './BlockView';

/**
 * 임시 테스트 데이터
 */
const SAMPLE_DATA = [
  {
    name: '단백질',
    progress: 0.73,
    color: '#ec407a',
    gram: 100,
  },
  {
    name: '지방',
    progress: 0.42,
    color: '#c0ca33',
    gram: 10,
  },
  {
    name: '탄수화물',
    progress: 0.93,
    color: '#2979ff',
    gram: 90,
  },
  {
    name: '물',
    progress: 0.23,
    color: '#293444',
    gram: 30,
  },
];

function ProgressBar({name, color, progress, gram}) {
  return (
    <View style={styles.progress}>
      <Text style={styles.title}>{name}</Text>
      <Progress.Bar width={200} progress={progress} color={color} />
      <Text style={styles.gram}>{gram}g</Text>
    </View>
  );
}

export default function NutrientsProgress() {
  return (
    <BlockView>
      {SAMPLE_DATA.map(data => (
        <ProgressBar key={data.name} {...data} />
      ))}
    </BlockView>
  );
}

const styles = StyleSheet.create({
  title: {
    width: 65,
    marginRight: 12,
    fontSize: 18,
    textAlign: 'right',
  },
  gram: {marginLeft: 12, width: 34, textAlign: 'left'},
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
});
