import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddButton from '../components/AddButton';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <>
      <SafeAreaView style={styles.block} edges={['top']}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#834bff',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
      <AddButton />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});
