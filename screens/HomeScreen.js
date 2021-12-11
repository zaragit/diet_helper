import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Text} from 'react-native-elements';
import BlockView from '../components/BlockView';
import GraphSwiper from '../components/GraphSwiper';
import NutrientsProgress from '../components/NutrientsProgress';

function HalfBlock({style, children}) {
  const dimensions = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();

  const homeScreenWidth = dimensions.width;
  const homeScreenHeight = dimensions.height - tabBarHeight;
  const commonStyle = {width: homeScreenWidth, height: homeScreenHeight / 2};

  return <BlockView style={[commonStyle, style]}>{children}</BlockView>;
}

function HalfBlockWithCover({styleName, children}) {
  return (
    <HalfBlock style={styles[styleName]}>
      <HalfBlock style={styles[styleName + 'Cover']} />
      {children}
    </HalfBlock>
  );
}

export default function HomeScreen() {
  return (
    <BlockView>
      <HalfBlockWithCover styleName="top">
        <GraphSwiper />
      </HalfBlockWithCover>
      <HalfBlockWithCover styleName="bottom">
        <View style={styles.navigator}>
          <Pressable>
            <View
              style={[styles.navigatorButton, {backgroundColor: '#834bff'}]}
            />
          </Pressable>
          <Pressable>
            <View
              style={[styles.navigatorButton, {backgroundColor: '#2196f3'}]}
            />
          </Pressable>
          <Pressable>
            <View
              style={[styles.navigatorButton, {backgroundColor: '#26a69a'}]}
            />
          </Pressable>
        </View>
        <NutrientsProgress />
      </HalfBlockWithCover>
    </BlockView>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCover: {
    position: 'absolute',
    backgroundColor: '#834bff',
    borderBottomLeftRadius: 80,
    zIndex: -1,
  },
  bottom: {
    backgroundColor: '#834bff',
  },
  bottomCover: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 80,
    zIndex: -1,
  },
  navigator: {
    position: 'absolute',
    width: 250,
    height: 100,
    top: -50,
    backgroundColor: '#ffffff',
    borderWidth: 10,
    borderColor: '#834bff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  navigatorButton: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },
});
