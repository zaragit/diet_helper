import React from "react";
import { Pressable } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import { useGaugeContext } from "../../../contexts/GaugeContext";

interface Props {
  prevTheta: SharedValue<number>;
  currentTheta: SharedValue<number>;
  nextTheta: SharedValue<number>;
  gestureTarget: SharedValue<{
    prevTheta: SharedValue<number>;
    currentTheta: SharedValue<number>;
    nextTheta: SharedValue<number>;
  } | null>;
  children?: React.ReactNode;
}

function Gesture({
  prevTheta,
  currentTheta,
  nextTheta,
  gestureTarget,
  children,
}: Props) {
  const { R, CENTER, STROKE_WIDTH } = useGaugeContext();

  const endPosition = useDerivedValue(
    () => polar2Canvas({ theta: currentTheta.value, radius: R }, CENTER),
    [currentTheta]
  );

  return (
    <Pressable
      onPressIn={() => {
        gestureTarget.value = {
          prevTheta,
          currentTheta,
          nextTheta,
        };
      }}
    >
      <Animated.View
        style={useAnimatedStyle(() => ({
          position: "absolute",
          width: STROKE_WIDTH,
          height: STROKE_WIDTH,
          left: endPosition.value.x - STROKE_WIDTH / 2,
          top: endPosition.value.y - STROKE_WIDTH / 2,
          alignItems: "center",
          justifyContent: "center",
        }))}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default Gesture;
