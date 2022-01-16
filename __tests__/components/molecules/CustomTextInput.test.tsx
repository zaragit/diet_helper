import React from "react";
import EntypoIcon from "../../../components/atoms/EntypoIcon";
import CustomTextInput from "../../../components/molecules/CustomTextInput";
import { fireEvent, render } from "@testing-library/react-native";

describe("<CustomTextInput/> renders correctly", () => {
  it("change input text", () => {
    /**
     * TODO-LIST : useEffect 값의 변경은 어떻게 테스트??
     *             알아보고 리팩토링 할 것
     */
    let text = "";
    const { getByTestId } = render(
      <CustomTextInput
        text={text}
        onChangeText={(newText) => (text = newText)}
      />
    );

    fireEvent.changeText(getByTestId("textInput"), "test");

    expect(text).toEqual("test");
  });

  it("renders Icons", () => {
    const { getByTestId } = render(
      <CustomTextInput
        text=""
        onChangeText={() => {}}
        leftIcon={<EntypoIcon name="email" />}
        rightIcon={<EntypoIcon name="email" />}
      />
    );

    expect(getByTestId("leftIcon")).not.toBeNull();
    expect(getByTestId("rightIcon")).not.toBeNull();
  });

  it("onPress Icons", () => {
    let pressedLeftIcon = false;
    let pressedRightIcon = false;

    const { getByTestId } = render(
      <CustomTextInput
        text=""
        onChangeText={() => {}}
        leftIcon={<EntypoIcon name="email" />}
        rightIcon={<EntypoIcon name="email" />}
        onLeftIconPress={() => {
          pressedLeftIcon = true;
        }}
        onRightIconPress={() => {
          pressedRightIcon = true;
        }}
      />
    );

    fireEvent.press(getByTestId("leftIcon"));
    fireEvent.press(getByTestId("rightIcon"));

    expect(pressedLeftIcon).toBeTruthy();
    expect(pressedRightIcon).toBeTruthy();
  });
});
