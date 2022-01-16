import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BasicButton from "../../../components/molecules/BasicButton";

test("<BasicButton/> renders correctly", () => {
  const onPressMock = jest.fn();
  const eventData = {
    nativeEvent: {
      pageX: 20,
      pageY: 30,
    },
  };

  const { getByText } = render(
    <BasicButton title="Test Button" onPress={onPressMock} />
  );

  fireEvent.press(getByText("Test Button"), eventData);
  expect(onPressMock).toHaveBeenCalledWith(eventData);
});
