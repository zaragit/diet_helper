import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "../components/molecules/BasicButton";
import { useAuthContext } from "../contexts/AuthContext";
import { signOut } from "../libs/Auth";
import { traslateInternationalAge } from "../libs/Date";

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

function HomeScreen() {
  const { profile } = useAuthContext();

  if (profile === null) {
    return <></>;
  }

  const { weight, height, age } = profile || {};

  const basalMetabolism =
    66 +
    13.7 * weight +
    5 * height -
    6.8 * traslateInternationalAge(new Date(age));

  const maintenanceCalories = calculateMaintenanceCalories(
    Activity.LITTLE,
    basalMetabolism
  );

  const goalCalories = calculateGoalCalories(
    Strength.MIDDLE,
    maintenanceCalories
  );

  console.log(goalCalories);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <BasicButton width={100} title="로그아웃" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
