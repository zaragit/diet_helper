import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import Colors from "../libs/Colors";
import CalendarPicker from "../components/organisms/CalendarPicker";
import { traslateInternationalAge } from "../libs/Date";
import WeightScale from "../components/organisms/WeightScale";
import { Dimensions } from "react-native";
import HeightScale from "../components/organisms/HeightScale";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function WelcomeScreen() {
  const [form, setForm] = useState({
    age: new Date(),
    weight: 60,
    height: 170,
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
        <ProgressStep {...commonProps(false, true)}>
          <Text>step4</Text>
          <Text>당신의 BMI 지수는 {calculateBMI()} 입니다.</Text>
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
