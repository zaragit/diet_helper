import React from "react";
import { fireEvent, render, TextMatch } from "@testing-library/react-native";
import SignForm from "../../../components/organisms/SignForm";

describe("<SignForm />", () => {
  test.each([["이메일"], ["패스워드"], ["패스워드 확인"]])(
    '"isSignUp === true" 일 때, placeholder가 "$source"인 Input이 랜더링된다.',
    (source) => {
      const isSignUp = true;

      const { queryByPlaceholderText } = render(
        <SignForm
          form={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          isSignUp={isSignUp}
          createChangeTextHandler={() => () => {}}
        />
      );

      expect(queryByPlaceholderText(source)).not.toBeNull();
    }
  );

  it('"isSignUp === false" 일 때, placeholder가 "패스워드 확인"인 Input이 랜더링되면 안된다.', () => {
    const isSignUp = false;

    const { queryByPlaceholderText } = render(
      <SignForm
        form={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        isSignUp={isSignUp}
        createChangeTextHandler={() => () => {}}
      />
    );

    expect(queryByPlaceholderText("패스워드 확인")).toBeNull();
  });

  test.each([["패스워드"], ["패스워드 확인"]])(
    'placeholder가 "$source"인 Input은 secureTextEntry이 적용되어야 한다.',
    (source) => {
      const { getAllByTestId, queryByPlaceholderText } = render(
        <SignForm
          form={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          isSignUp={true}
          createChangeTextHandler={() => () => {}}
        />
      );

      expect(
        queryByPlaceholderText(source)?.props.secureTextEntry
      ).toBeTruthy();
    }
  );

  test.each([["패스워드"], ["패스워드 확인"]])(
    'placeholder가 "$source"인 Input의 rightIcon을 클릭하면 secureTextEntry가 해제된다.',
    (source) => {
      const { getAllByTestId, queryByPlaceholderText } = render(
        <SignForm
          form={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          isSignUp={true}
          createChangeTextHandler={() => () => {}}
        />
      );

      getAllByTestId("rightIcon").forEach((icon) => fireEvent.press(icon));

      expect(queryByPlaceholderText(source)?.props.secureTextEntry).toBeFalsy();
    }
  );
});
