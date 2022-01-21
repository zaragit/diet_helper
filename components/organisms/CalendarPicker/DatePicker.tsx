import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import Colors from "../../../libs/Colors";

interface Props {
  date: Date;
  changePreviousStep: () => void;
  onChange: (date: Date) => void;
}

function DatePicker({ date, changePreviousStep, onChange }: Props) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const pickDate = date.getDate();

  const leftPad = (value: number) => {
    if (value >= 10) {
      return value;
    }
    return "0" + value;
  };

  return (
    <Calendar
      current={`${year}-${leftPad(month)}-${leftPad(pickDate)}`}
      markingType={"custom"}
      style={{ width: 270, height: 360 }}
      markedDates={{
        [`${year}-${leftPad(month)}-${leftPad(pickDate)}`]: {
          selected: true,
          selectedColor: Colors.BLACK,
        },
      }}
      theme={{
        dayTextColor: Colors.BLACK,
        monthTextColor: Colors.BLACK,
        // @ts-ignore:next-line
        "stylesheet.calendar.header": { ...DAY_TEXT_THEME },
      }}
      renderArrow={(direction) => {
        return (
          <Ionicons
            size={16}
            name={direction === "left" ? "caret-back" : "caret-forward"}
          />
        );
      }}
      enableSwipeMonths={true}
      onDayPress={({ dateString }) => onChange(new Date(dateString))}
      renderHeader={(date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return (
          <>
            <Pressable
              onPress={changePreviousStep}
              style={{ flexDirection: "row" }}
            >
              <Text style={{ fontSize: 16, marginRight: 6 }}>{year}년</Text>
              <Text style={{ fontSize: 16 }}>{month}월</Text>
            </Pressable>
          </>
        );
      }}
    />
  );
}

const DAY_TEXT_THEME = {
  dayTextAtIndex0: {
    color: Colors.RED,
  },
  dayTextAtIndex1: {
    color: Colors.BLACK,
  },
  dayTextAtIndex2: {
    color: Colors.BLACK,
  },
  dayTextAtIndex3: {
    color: Colors.BLACK,
  },
  dayTextAtIndex4: {
    color: Colors.BLACK,
  },
  dayTextAtIndex5: {
    color: Colors.BLACK,
  },
  dayTextAtIndex6: {
    color: Colors.BLUE,
  },
};

LocaleConfig.locales["kr"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "kr";

export default DatePicker;
