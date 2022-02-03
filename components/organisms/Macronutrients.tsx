import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import {
  canvas2Polar,
  PI,
  polar2Canvas,
  TAU,
  Vector,
} from "react-native-redash";
import Svg, { Circle, Line, Path } from "react-native-svg";
import Colors from "../../libs/Colors";
import { traslateInternationalAge } from "../../libs/Date";
import { FontAwesome5 } from "@expo/vector-icons";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  age: Date;
  weight: number;
  height: number;
  activity: Activity;
  strength: Strength;
  percentage: {
    fat: number;
    carbohydrate: number;
    protein: number;
  };
}

export enum Activity {
  VERY_LITTLE,
  LITTLE,
  USUALLY,
  MUCH,
  VERY_MUCH,
}

export enum Strength {
  HARD,
  MIDDLE,
  WEAK,
}

export const containedInSquare = (
  value: Vector,
  center: Vector,
  side: number
) => {
  "worklet";
  const topLeft = { x: center.x - side / 2, y: center.y - side / 2 };
  return (
    value.x >= topLeft.x &&
    value.y >= topLeft.y &&
    value.x <= topLeft.x + side &&
    value.y <= topLeft.y + side
  );
};

export const normalize = (value: number) => {
  "worklet";
  const rest = value % TAU;
  return rest > 0 ? rest : TAU + rest;
};

const calculateMaintenanceCalories = (activity: Activity, calories: number) => {
  switch (activity) {
    case Activity.VERY_MUCH:
      return calories * 1.9;
    case Activity.MUCH:
      return calories * 1.725;
    case Activity.USUALLY:
      return calories * 1.55;
    case Activity.LITTLE:
      return calories * 1.375;
    case Activity.VERY_LITTLE:
    default:
      return calories * 1.2;
  }
};

const calculateGoalCalories = (strength: Strength, calories: number) => {
  switch (strength) {
    case Strength.HARD:
      return calories * 0.8;
    case Strength.MIDDLE:
      return calories * 0.85;
    case Strength.WEAK:
    default:
      return calories * 0.9;
  }
};

function Macronutrients({
  age,
  weight,
  height,
  activity,
  strength,
  percentage,
}: Props) {
  const basalMetabolism =
    66 + 13.7 * weight + 5 * height - 6.8 * traslateInternationalAge(age);

  const maintenanceCalories = calculateMaintenanceCalories(
    activity,
    basalMetabolism
  );

  const goalCalories = calculateGoalCalories(strength, maintenanceCalories);

  const { fat, carbohydrate, protein } = percentage;

  const size = 360;
  const halfSize = size / 2;
  const stroke = 50;
  const r = halfSize - stroke;
  const center = { x: halfSize, y: halfSize };

  const vector = (theta: number, distance: number) => {
    return polar2Canvas(
      {
        theta: theta,
        radius: r - stroke / 2 - distance,
      },
      center
    );
  };

  // pi / 2 -> 0

  // if (theta <= pi / 2) => 0 방향으로 줄인다.
  // else if (theta > 1.5pi) => 줄인다.
  // else if (theta <= 1.5pi) => 줄인다.       else if (theta > 0.5pi) 크면 줄인다.

  // 0.5pi

  const fatTheta = useSharedValue(2 * PI * (fat / 100));
  const proteinTheta = useSharedValue(
    2 * PI * (protein / 100) + fatTheta.value
  );
  const carbohydrateTheta = useSharedValue(
    2 * PI * (carbohydrate / 100) + proteinTheta.value
  );

  const position = (theta: number) => {
    "worklet";
    return polar2Canvas({ theta, radius: r }, center);
  };

  const absoluteDuration = (start: number, end: number) => {
    "worklet";
    return start > end ? end + (TAU - start) : end - start;
  };

  const arc = (x: number, y: number, large = false, sweep = false) => {
    "worklet";
    return `A ${r} ${r} 0 ${large ? "1" : "0"} ${sweep ? "1" : "0"} ${x} ${y}`;
  };

  const fatPosition = useDerivedValue(() => position(fatTheta.value));

  const proteinPosition = useDerivedValue(() => position(proteinTheta.value));

  const carbohydratePosition = useDerivedValue(() =>
    position(carbohydrateTheta.value)
  );

  const fatBarProps = useAnimatedProps(() => {
    const p1 = fatPosition.value;
    const p2 = proteinPosition.value;
    const duration = absoluteDuration(0, fatTheta.value);

    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  });

  const proteinBarProps = useAnimatedProps(() => {
    const p1 = proteinPosition.value;
    const p2 = carbohydratePosition.value;
    const duration = absoluteDuration(
      proteinTheta.value,
      carbohydrateTheta.value
    );

    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  });

  const carbohydrateBarProps = useAnimatedProps(() => {
    const p1 = carbohydratePosition.value;
    const p2 = fatPosition.value;
    const duration = absoluteDuration(carbohydrateTheta.value, fatTheta.value);

    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  });

  const proteinCursorProps = useAnimatedProps(() => ({
    cx: proteinPosition.value.x,
    cy: proteinPosition.value.y,
    r: stroke / 2,
  }));

  const fatCursorStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: stroke,
    height: stroke,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      { translateX: fatPosition.value.x - stroke / 2 },
      { translateY: fatPosition.value.y - stroke / 2 },
    ],
  }));

  const proteinCursorStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: stroke,
    height: stroke,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      { translateX: proteinPosition.value.x - stroke / 2 },
      { translateY: proteinPosition.value.y - stroke / 2 },
    ],
  }));

  const carbohydrateCursorStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: stroke,
    height: stroke,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      { translateX: carbohydratePosition.value.x - stroke / 2 },
      { translateY: carbohydratePosition.value.y - stroke / 2 },
    ],
  }));

  const onGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offset: number }
  >({
    onStart: ({ x, y }, context) => {
      if (containedInSquare({ x, y }, proteinPosition.value, stroke)) {
        context.offset = proteinTheta.value;
      }
    },
    onActive: ({ x, y }, context) => {
      const { theta } = canvas2Polar({ x, y }, center);
      const delta = theta - context.offset;

      proteinTheta.value = normalize(proteinTheta.value + delta);

      context.offset = theta;
    },
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          strokeWidth={stroke}
          stroke={Colors.GRAY}
          cx={halfSize}
          cy={halfSize}
          r={r}
        />
        {new Array(20).fill(0).map((_, i) => {
          const theta = (i * TAU) / 20;

          const v1 = vector(theta, size * 0.02);
          const v2 = vector(theta, size * 0.04);

          return (
            <>
              <Line
                key={theta}
                x1={v1.x}
                y1={v1.y}
                x2={v2.x}
                y2={v2.y}
                stroke={Colors.GRAY}
                strokeWidth={2}
                strokeLinecap="round"
              />
              {new Array(5).fill(0).map((_, j) => {
                const alpha = theta + (j + 1) * (TAU / 20 / 5);

                const v1 = vector(alpha, size * 0.02);
                const v2 = vector(alpha, size * 0.03);

                return (
                  <Line
                    key={`${theta}-${alpha}`}
                    x1={v1.x}
                    y1={v1.y}
                    x2={v2.x}
                    y2={v2.y}
                    stroke={Colors.GRAY}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                );
              })}
            </>
          );
        })}
        <AnimatedPath
          stroke={Colors.LIGHT_BLUE}
          strokeWidth={stroke}
          animatedProps={fatBarProps}
        />
        <AnimatedPath
          stroke={Colors.LIGHT_RED}
          strokeWidth={stroke}
          animatedProps={proteinBarProps}
        />
        <AnimatedPath
          stroke={Colors.LIGHT_YELLOW}
          strokeWidth={stroke}
          animatedProps={carbohydrateBarProps}
        />
        <Circle
          cx={fatPosition.value.x}
          cy={fatPosition.value.y}
          r={stroke / 2}
          fill={Colors.BLUE}
        />
        <AnimatedCircle animatedProps={proteinCursorProps} fill={Colors.RED} />
        <Circle
          cx={carbohydratePosition.value.x}
          cy={carbohydratePosition.value.y}
          r={stroke / 2}
          fill={Colors.YELLOW}
        />
      </Svg>
      <PanGestureHandler onGestureEvent={onGestureEventHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={fatCursorStyle}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/74804564/150666265-dbde0204-bfbb-443e-8343-9c4d3b3bbf82.png",
              }}
              fadeDuration={0}
              style={{ width: 24, height: 24 }}
            />
          </Animated.View>
          <Animated.View style={proteinCursorStyle}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/74804564/150666277-dfdc304c-ca1f-4650-bce8-14a6075974ce.png",
              }}
              fadeDuration={0}
              style={{ width: 24, height: 24 }}
            />
          </Animated.View>
          <Animated.View style={carbohydrateCursorStyle}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/74804564/150666202-14f39255-a64b-493f-947f-40c0d6439934.png",
              }}
              fadeDuration={0}
              style={{ width: 24, height: 24 }}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Macronutrients;
