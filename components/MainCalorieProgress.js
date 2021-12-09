import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text} from 'react-native-elements';
import WaveFunc from './WaveFunc';

export default function MainCalorieProgress({calorie}) {
  const [H, setH] = useState(0);

  const addH = () => {
    console.log(H);
    if (H + 10 >= 200) {
      setH(10);
      return;
    }
    setH(H + 10);
  };

  return (
    <AnimatedCircularProgress
      size={226}
      width={6}
      fill={45}
      tintColor="#00e0ff">
      {fill => (
        <>
          <View style={styles.circle}>
            <Text style={styles.calorie}>
              {calorie.toLocaleString('ko-KR')}
            </Text>
            <Text style={styles.kcal}>kcal</Text>
            <Text style={styles.fill}>45%</Text>
            <Pressable style={styles.waveBall} onPress={addH}>
              <WaveFunc
                style={styles.waveBall}
                H={H}
                waveParams={[
                  {A: 20, T: 360, fill: '#01579b'},
                  {A: 30, T: 280, fill: '#0277bd'},
                  {A: 40, T: 200, fill: '#0288d1'},
                ]}
                animated={true}
              />
            </Pressable>
          </View>
        </>
      )}
    </AnimatedCircularProgress>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calorie: {
    fontSize: 40,
  },
  kcal: {
    fontSize: 25,
    color: '#616161',
  },
  fill: {
    position: 'absolute',
    fontSize: 23,
    bottom: 10,
  },
  wave: {
    width: 200,
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  waveBall: {
    position: 'absolute',
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    zIndex: -1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
