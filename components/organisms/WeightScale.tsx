import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import Colors from "../../libs/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ReText } from "react-native-redash";

const SCALE_UNIT_WIDTH = 20;

const subtractWhiteSpace = (num: number, width: number) => {
  "worklet";
  return num - width / 2;
};

const addWhiteSpace = (num: number, width: number) => {
  "worklet";
  return num + width / 2;
};

const scale2Weight = (scale: number, width: number, minWeight: number) => {
  "worklet";
  return addWhiteSpace(scale, width) / SCALE_UNIT_WIDTH + minWeight;
};

interface Props {
  width: number;
  height: number;
  maxWeight: number;
  minWeight: number;
  startWeight?: number;
  setWeight: (weight: number) => void;
}

function Scale2({
  width,
  height,
  startWeight,
  maxWeight,
  minWeight,
  setWeight,
}: Props) {
  if (startWeight && (startWeight > maxWeight || startWeight < minWeight)) {
    throw Error(
      "'startWeight' must be the value between 'maxWeight' and 'minWeight'"
    );
  }

  const scaleInterval = maxWeight - minWeight;

  startWeight = startWeight ? startWeight - 20 : scaleInterval / 2;

  const scale = useSharedValue(
    subtractWhiteSpace(startWeight * SCALE_UNIT_WIDTH, width)
  );
  const scaleText = useDerivedValue(
    () =>
      scale2Weight(scale.value, width, minWeight)
        .toFixed(2)
        .replace(".00", "") + " KG"
  );
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -scale.value }],
  }));

  const onGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; slowly: boolean }
  >({
    onStart: (_, context) => {
      context.startX = scale.value;
    },
    onActive: (event, context) => {
      scale.value = context.startX - event.translationX;

      context.slowly = Math.abs(event.velocityX) < 1000;
    },
    onEnd: (event, context) => {
      if (!context.slowly) {
        scale.value = withDecay(
          {
            velocity: -event.velocityX,
            clamp: [
              subtractWhiteSpace(0, width),
              subtractWhiteSpace(scaleInterval * SCALE_UNIT_WIDTH, width),
            ],
          },
          () => {
            runOnJS(setWeight)(scale2Weight(scale.value, width, minWeight));
          }
        );
      } else {
        runOnJS(setWeight)(scale2Weight(scale.value, width, minWeight));
      }
    },
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={onGestureEventHandler}>
        <Animated.View style={[{ width: width + 1, overflow: "hidden" }]}>
          <Animated.View style={[styles.scaleContainer, scaleStyle]}>
            {new Array(scaleInterval + 1).fill(0).map((_, i) => {
              if (i % 5 === 0) {
                return (
                  <View key={`scale-${i}`} style={{ width: SCALE_UNIT_WIDTH }}>
                    <View style={[styles.scale, { height }]} />
                    <Text style={styles.scaleIndexText}>{i + minWeight}</Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={`scale-${i}`}
                    style={[
                      styles.scale,
                      {
                        height: height / 2,
                        top: -10,
                      },
                    ]}
                  />
                );
              }
            })}
          </Animated.View>
          <LinearGradient
            style={{
              width: width + 1,
              height,
              position: "absolute",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.5, 1]}
            colors={["#ffffff", "#ffffff00", "#ffffff"]}
          />
        </Animated.View>
      </PanGestureHandler>
      <Svg width={50} height={50} style={{ top: 10, left: 1 }}>
        <Path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={10}
          d="M23.267949192431 5.7823776072813a2 2 0 0 1 3.4641016151378 0l21.035898384862 36.435244785437a2 2 0 0 1 -1.7320508075689 3l-42.071796769724 0a2 2 0 0 1 -1.7320508075689 -3"
          fill={Colors.RED}
        />
      </Svg>
      <ReText style={styles.scaleText} text={scaleText} />
    </>
  );
}

const styles = StyleSheet.create({
  scaleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scale: {
    width: 4,
    marginRight: SCALE_UNIT_WIDTH - 4,
    borderRadius: 2,
    backgroundColor: Colors.BLACK,
  },
  scaleIndexText: {
    width: 25,
    fontSize: 10,
    right: SCALE_UNIT_WIDTH / 2 - 5,
    marginTop: 10,
    fontWeight: "bold",
  },
  scaleText: { fontSize: 40, marginTop: 30 },
});

export default Scale2;
