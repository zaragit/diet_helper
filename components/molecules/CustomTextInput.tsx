import React from "react";
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../../libs/Colors";

interface Props {
  text: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  width?: number;
  secureTextEntry?: boolean;
  leftIcon?: JSX.Element;
  onLeftIconPress?: () => void;
  rightIcon?: JSX.Element;
  onRightIconPress?: () => void;
}

function CustomTextInput({
  text,
  onChangeText,
  placeholder,
  containerStyle,
  secureTextEntry,
  width = useWindowDimensions().width - 200,
  leftIcon,
  onLeftIconPress = () => {},
  rightIcon,
  onRightIconPress = () => {},
}: Props) {
  return (
    <View style={[styles.container, containerStyle, { width }]}>
      <Pressable testID="leftIcon" onPress={onLeftIconPress}>
        {leftIcon}
      </Pressable>
      <TextInput
        testID="textInput"
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[styles.input, !leftIcon && { padding: 10 }]}
      />
      <Pressable testID="rightIcon" onPress={onRightIconPress}>
        {rightIcon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: Colors.BLACK,
    backgroundColor: Colors.WHITE,
    height: 38,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  input: {
    flex: 1,
  },
});

export default CustomTextInput;
