import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import WaveFunc from './WaveFunc';

export default function WaveTest() {
  const [H, setH] = useState(0);

  const addH = () => {
    console.log(H);
    if (H + 10 >= 100) {
      setH(10);
      return;
    }
    setH(H + 10);
  };

  return (
    <>
      <View style={_styles.container}>
        <Text>test3</Text>
        <Pressable onPress={addH}>
          <WaveFunc
            style={_styles.waveBall}
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
  );
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    width: 200,
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  waveBall: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
});
