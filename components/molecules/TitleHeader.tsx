import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Colors from "../../libs/Colors";

function TitleHeader({ animation = false }: { animation?: boolean }) {
  const carbohydratePos = useRef(new Animated.Value(-100)).current;
  const proteinPos = useRef(new Animated.Value(-100)).current;
  const fatPos = useRef(new Animated.Value(100)).current;

  const animate = (pos: Animated.Value, callback?: () => void) => {
    Animated.timing(pos, {
      toValue: 0,
      delay: 100,
      useNativeDriver: false,
    }).start(callback);
  };

  useEffect(() => {
    if (animation) {
      animate(carbohydratePos, () => {
        animate(proteinPos, () => {
          animate(fatPos);
        });
      });
    }
  }, [animation, carbohydratePos, proteinPos, fatPos]);

  return (
    <View style={styles.title}>
      <Animated.Text
        style={[
          styles.titleWord,
          { color: Colors.LIGHT_BLUE },
          animation && { transform: [{ translateX: carbohydratePos }] },
        ]}
      >
        탄
      </Animated.Text>
      <Animated.Text
        style={[
          styles.titleWord,
          { color: Colors.LIGHT_RED },
          animation && { transform: [{ translateY: proteinPos }] },
        ]}
      >
        단
      </Animated.Text>
      <Animated.Text
        style={[
          styles.titleWord,
          { color: Colors.LIGHT_YELLOW },
          animation && { transform: [{ translateX: fatPos }] },
        ]}
      >
        지
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  title: {
    flexDirection: "row",
  },
  titleWord: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 6,
  },
  distance: { marginBottom: 16 },
  icon: {
    height: 38,
    width: 38,
    padding: 10,
    alignItems: "center",
  },
});

export default TitleHeader;
