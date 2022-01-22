import React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { G, Image, Line, Text } from "react-native-svg";
import Colors from "../../libs/Colors";
import { Feather } from "@expo/vector-icons";

const DEFAULT_MAX_HEIGHT = 230;
const DEFAULT_MIN_HEIGHT = 130;
const DEFAULT_STROKE = 2;
const DEFAULT_UNIT = 5;

const IMAGE_URI =
  "https://user-images.githubusercontent.com/74804564/150649771-7ea974d8-b342-47b4-80ba-d1750b2762de.png";
const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 200;

const AnimatedSvgImage = Animated.createAnimatedComponent(Image);

export interface ScaleProps {
  stroke?: number;
  maxHeight?: number;
  minHeight?: number;
  unit?: number;
  initHeight?: number;
}

interface Props {
  width: number;
  height: number;
  scaleProps?: ScaleProps;
  setHeight: (height: number) => void;
}

function HeightScale3({ width, height, scaleProps = {}, setHeight }: Props) {
  const {
    stroke = DEFAULT_STROKE,
    maxHeight = DEFAULT_MAX_HEIGHT,
    minHeight = DEFAULT_MIN_HEIGHT,
    unit = DEFAULT_UNIT,
    initHeight = DEFAULT_MAX_HEIGHT,
  } = scaleProps;

  const range = maxHeight - minHeight;
  const countScale = range / unit;
  const scaleGroupWidth = width - IMAGE_WIDTH;
  const scaleGroupHeight = height - IMAGE_HEIGHT;
  const scaleUnitHeight = scaleGroupHeight / countScale;
  const scaleFontSize = scaleUnitHeight * 0.7;
  const tramScale = stroke / 2;
  const tramSpace = scaleFontSize / 2 + tramScale / 2;

  const height2Scale = (height: number) => {
    "worklet";
    const percentage = (maxHeight - height) / 100;
    return scaleGroupHeight * percentage - tramSpace;
  };

  const scale2Height = (scale: number) => {
    "worklet";
    const percentage = (scale + tramSpace) / scaleGroupHeight;
    return maxHeight - range * percentage;
  };

  const scale = useSharedValue(height2Scale(initHeight));

  const animatedImageProps = useAnimatedProps(() => {
    const diff = tramSpace + scaleFontSize;
    return {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT + scaleGroupHeight - scale.value - diff,
      x: scaleGroupWidth,
      y: scale.value + diff,
    };
  });

  const animatedCursorStyle = useAnimatedStyle(() => ({
    width: width - scaleGroupWidth,
    left: scaleGroupWidth + 5,
    top: scale.value,
  }));

  const onGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >({
    onStart: (_, context) => {
      context.startY = scale.value;
    },
    onActive: (event, context) => {
      const maxValue = scaleGroupHeight - tramSpace;
      const minValue = 0 - tramSpace;
      const newScale = context.startY + event.translationY;

      if (newScale <= maxValue && newScale >= minValue) {
        scale.value = newScale;
      } else {
        scale.value = newScale > maxValue ? maxValue : minValue;
      }

      runOnJS(setHeight)(scale2Height(scale.value));
    },
    onEnd: (event, context) => {
      runOnJS(setHeight)(scale2Height(scale.value));
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ width }}>
        <Svg width={width} height={height}>
          <G>
            {new Array(countScale + 1).fill(0).map((_, i) => {
              const y = i * scaleUnitHeight + scaleFontSize;
              const isStandardScale = i % 2 === 0;
              return (
                <G key={i}>
                  {isStandardScale ? (
                    <Text
                      x={0}
                      y={y}
                      fontSize={scaleFontSize}
                      stroke={Colors.BLACK}
                      textAnchor="start"
                      alignmentBaseline="middle"
                    >
                      {maxHeight - i * unit}
                    </Text>
                  ) : (
                    <></>
                  )}
                  <Line
                    x1={scaleFontSize * 2 + 5}
                    y1={y - tramScale}
                    x2={scaleFontSize * 2 + (isStandardScale ? 30 : 20)}
                    y2={y - tramScale}
                    stroke={Colors.BLACK}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                  />
                </G>
              );
            })}
          </G>
          <AnimatedSvgImage
            animatedProps={animatedImageProps}
            href={{ uri: IMAGE_URI }}
          />
        </Svg>
        <PanGestureHandler onGestureEvent={onGestureEventHandler}>
          <Animated.View style={[styles.cursor, animatedCursorStyle]}>
            <View style={styles.cursorLine} />
            <View style={styles.cursorPointer}>
              <Feather name="code" size={24} style={styles.cursorPointerIcon} />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cursor: {
    height: 30,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cursorLine: {
    height: 3,
    width: "100%",
    borderRadius: 1.5,
    backgroundColor: Colors.RED,
  },
  cursorPointer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.RED,
    padding: 3,
  },
  cursorPointerIcon: {
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.WHITE,
    transform: [{ rotate: "90deg" }],
  },
});

export default HeightScale3;
