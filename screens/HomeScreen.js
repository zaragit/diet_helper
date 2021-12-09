import React, {useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import BlockView from '../components/BlockView';
import DetailLayout from './layouts/DetailLayout';
import GraphLayout from './layouts/GraphLayout';

export default function HomeScreen() {
  const [calorie, setCalorie] = useState(2000);
  const {width, height} = useWindowDimensions();

  return (
    <>
      <BlockView>
        <View style={[styles.top, {width, height: height / 2}]}>
          <View style={[styles.topCover, {width, height: height / 2}]} />
          <GraphLayout calorie={calorie} />
        </View>
        <View style={[styles.bottom, {width, height: height / 2}]}>
          <View style={[styles.bottomCover, {width, height: height / 2}]} />
          <DetailLayout />
        </View>
      </BlockView>
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#ffffff',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCover: {
    position: 'absolute',
    backgroundColor: '#834bff',
    borderBottomLeftRadius: 70,
    zIndex: -1,
  },
  bottom: {
    bottom: 0,
    backgroundColor: '#834bff',
  },
  bottomCover: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 70,
    zIndex: -1,
  },
  // top: {
  //   position: 'absolute',
  //   width: width,
  //   height: topHeight,
  //   backgroundColor: '#ffffff',
  //   zIndex: -1,
  // },
  // top2: {
  //   position: 'absolute',
  //   width: width,
  //   height: topHeight,
  //   // backgroundColor: '#834bff',
  //   backgroundColor: 'red',
  //   borderBottomLeftRadius: 70,
  //   zIndex: 0,
  // },
  // bottom: {
  //   position: 'absolute',
  //   width: width,
  //   height: bottomHeight,
  //   top: topHeight,
  //   backgroundColor: '#834bff',
  //   zIndex: -1,
  // },
  // bottom2: {
  //   position: 'absolute',
  //   width: width,
  //   height: bottomHeight,
  //   top: topHeight,
  //   backgroundColor: '#ffffff',
  //   borderTopRightRadius: 70,
  //   zIndex: -1,
  // },
});
