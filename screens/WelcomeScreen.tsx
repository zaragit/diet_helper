import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import Colors from "../libs/Colors";
import CalendarPicker from "../components/organisms/CalendarPicker";
import { traslateInternationalAge } from "../libs/Date";
import WeightScale from "../components/organisms/WeightScale";
import { Dimensions } from "react-native";
import HeightScale from "../components/organisms/HeightScale";

import PercentGauge from "../components/organisms/PercentGauge";
import { createProfile, getProfileByUid } from "../libs/Profile";
import { useAuthContext } from "../contexts/AuthContext";
import { leftPad } from "../libs/Commons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const barColors = [Colors.LIGHT_RED, Colors.LIGHT_BLUE, Colors.LIGHT_YELLOW];
const pointerColors = [Colors.RED, Colors.BLUE, Colors.YELLOW];
const pointerIcons = [
  <Image
    source={{
      uri: "https://user-images.githubusercontent.com/74804564/150666265-dbde0204-bfbb-443e-8343-9c4d3b3bbf82.png",
    }}
    fadeDuration={0}
    style={{ width: 24, height: 24 }}
  />,
  <Image
    source={{
      uri: "https://user-images.githubusercontent.com/74804564/150666277-dfdc304c-ca1f-4650-bce8-14a6075974ce.png",
    }}
    fadeDuration={0}
    style={{ width: 24, height: 24 }}
  />,
  <Image
    source={{
      uri: "https://user-images.githubusercontent.com/74804564/150666202-14f39255-a64b-493f-947f-40c0d6439934.png",
    }}
    fadeDuration={0}
    style={{ width: 24, height: 24 }}
  />,
];

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

function WelcomeScreen() {
  const { user, setProfile } = useAuthContext();

  const [form, setForm] = useState({
    age: new Date(),
    weight: 60,
    height: 170,
    macro: [30, 50, 20],
    goal: 0,
  });

  const progressStepsStyle = {
    activeStepIconBorderColor: Colors.BLACK,
    activeStepNumColor: Colors.BLACK,
    completedStepIconColor: Colors.BLACK,
    completedProgressBarColor: Colors.BLACK,
    completedCheckColor: Colors.WHITE,
    disabledStepNumColor: Colors.GRAY,
    activeLabelColor: Colors.BLACK,
    completedLabelColor: Colors.BLACK,
  };

  const commonProps = (next = true, previous = true) => {
    return {
      scrollable: false,
      viewProps: { style: styles.processStep },
      ...(next
        ? {
            nextBtnText: "다음",
            nextBtnStyle: styles.processButton,
            nextBtnTextStyle: styles.processButtonText,
          }
        : {}),
      ...(previous
        ? {
            previousBtnText: "이전",
            previousBtnStyle: styles.processButton,
            previousBtnTextStyle: styles.processButtonText,
          }
        : {}),
    };
  };

  const createChangeTextHandler =
    (name: string) => (value: string | Date | number) => {
      setForm({ ...form, [name]: value });
    };

  const calculateBMI = () => {
    const { weight, height } = form;
    return weight / (height / 100) / (height / 100);
  };

  const changeGoalCalories = useCallback(() => {
    const { weight, height, age } = form;
    const basalMetabolism =
      66 + 13.7 * weight + 5 * height - 6.8 * traslateInternationalAge(age);

    const maintenanceCalories = calculateMaintenanceCalories(
      Activity.USUALLY,
      basalMetabolism
    );

    setForm({
      ...form,
      goal: Math.round(
        calculateGoalCalories(Strength.MIDDLE, maintenanceCalories)
      ),
    });
  }, [form]);

  const onSubmit = async () => {
    const { age, weight, height, goal, macro } = form;

    if (user) {
      createProfile(user.uid, {
        age: `${age.getFullYear()}-${leftPad(age.getMonth() + 1)}-${leftPad(
          age.getDate()
        )}`,
        weight,
        height,
        goal,
        macro,
      });

      const profile = await getProfileByUid(user.uid);
      setProfile(profile);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps {...progressStepsStyle}>
        <ProgressStep {...commonProps(true, false)}>
          <Text style={styles.text}>나이를 입력해 주세요!</Text>
          <Text style={{ fontSize: 30, marginBottom: 20 }}>
            만 {traslateInternationalAge(form.age)}세
          </Text>
          <CalendarPicker
            date={form.age}
            onChange={createChangeTextHandler("age")}
          />
        </ProgressStep>
        <ProgressStep {...commonProps()}>
          <Text style={[styles.text]}>몸무게가 어떻게 되시나요?</Text>
          <Text style={{ fontSize: 30, marginBottom: 20 }}>
            {form.weight.toFixed(2).replace(".00", "")} kg
          </Text>
          <WeightScale
            width={windowWidth}
            height={100}
            maxWeight={300}
            minWeight={20}
            startWeight={form.weight}
            setWeight={createChangeTextHandler("weight")}
          />
        </ProgressStep>
        <ProgressStep {...commonProps()}>
          <Text style={[styles.text]}>키를 입력해 주세요!!</Text>
          <Text style={{ fontSize: 30, marginBottom: 20 }}>
            {form.height.toFixed(2).replace(".00", "")} cm
          </Text>
          <HeightScale
            width={300}
            height={500}
            scaleProps={{ initHeight: form.height }}
            setHeight={createChangeTextHandler("height")}
          />
        </ProgressStep>
        <ProgressStep
          {...commonProps(true, true)}
          finishBtnText="완료"
          onSubmit={onSubmit}
        >
          <Text style={[styles.text]}>탄, 단, 지 비율</Text>
          <Text>현재 BMI 지수는 {calculateBMI().toFixed(2)} 입니다.</Text>
          <Text>목표 칼로리 {form.goal} kcal</Text>
          <PercentGauge
            size={300}
            percent={form.macro}
            onChange={(percents) => {
              setForm({
                ...form,
                macro: percents.map((percent) => Math.round(percent)),
              });
              changeGoalCalories();
            }}
            getBarColor={(index) => barColors[index]}
            getPointerColor={(index) => pointerColors[index]}
            getIcon={(index) => pointerIcons[index]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: 300,
              marginTop: 30,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginBottom: 6 }}>단백질</Text>
              <Text>{(form.goal * form.macro[0]) / 100} kcal</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginBottom: 6 }}>탄수화물</Text>
              <Text>{(form.goal * form.macro[1]) / 100} kcal</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginBottom: 6 }}>지방</Text>
              <Text>{(form.goal * form.macro[2]) / 100} kcal</Text>
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  processStep: { flex: 1, alignItems: "center", justifyContent: "center" },
  processButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 14,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  processButtonText: {
    color: Colors.WHITE,
  },
  text: { fontWeight: "bold", fontSize: 20, marginBottom: 20 },
  scaleText: { fontSize: 40, marginTop: 30 },
});

export default WelcomeScreen;
