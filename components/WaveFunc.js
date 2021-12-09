import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function WaveFunc({H, waveParams, style}) {
  const wave1Animation = useRef(new Animated.Value(0)).current;
  const wave2Animation = useRef(new Animated.Value(0)).current;
  const wave3Animation = useRef(new Animated.Value(0)).current;

  const [animations] = useState([
    wave1Animation,
    wave2Animation,
    wave3Animation,
  ]);

  useEffect(() => {
    animations.forEach((animation, index) => {
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000 + index * 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    });
  }, [animations]);

  return (
    <View style={style}>
      {waveParams.map(({A, T, fill}, index) => {
        const translateX = animations[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -2 * T],
        });

        return (
          <AnimatedSvg
            key={index}
            style={{
              width: 3 * T,
              height: A + H,
              position: 'absolute',
              left: 0,
              bottom: 0,
              transform: [{translateX}],
            }}
            preserveAspectRatio="xMinYMin meet"
            viewBox={`0 0 ${3 * T} ${A + H}`}>
            <Path
              d={`M 0 0 Q ${T / 4} ${-A} ${T / 2} 0 T ${T} 0 T ${
                (3 * T) / 2
              } 0 T ${2 * T} 0 T ${(5 * T) / 2} 0 T ${3 * T} 0 V ${H} H 0 Z`}
              fill={fill}
              transform={`translate(0, ${A})`}
            />
          </AnimatedSvg>
        );
      })}
    </View>
  );
}
