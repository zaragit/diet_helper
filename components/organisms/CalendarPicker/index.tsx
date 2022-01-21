import React, { createContext, useContext, useState } from "react";
import DatePicker from "./DatePicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";

enum CalendarStep {
  YEAR,
  MONTH,
  DATE,
}

interface Props {
  date: Date;
  onChange: (date: Date) => void;
}

function CalendarPicker({ date, onChange }: Props) {
  const [step, setStep] = useState<CalendarStep>(CalendarStep.YEAR);

  return (
    <>
      {step === CalendarStep.YEAR ? (
        <YearPicker
          date={date}
          onChange={(date: Date) => {
            onChange(date);
            setStep(CalendarStep.MONTH);
          }}
        />
      ) : step === CalendarStep.MONTH ? (
        <MonthPicker
          date={date}
          onChange={(date: Date, changeStep = true) => {
            onChange(date);
            if (changeStep) {
              setStep(CalendarStep.DATE);
            }
          }}
          changePreviousStep={() => setStep(CalendarStep.YEAR)}
        />
      ) : (
        <DatePicker
          date={date}
          changePreviousStep={() => setStep(CalendarStep.MONTH)}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default CalendarPicker;
