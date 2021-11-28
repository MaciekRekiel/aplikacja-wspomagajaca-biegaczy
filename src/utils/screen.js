import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;

export const SCROLLVIEW_PADDING_TOP = SCREEN_HEIGHT * 0.2;

export const calculatePaddingTop = (statements) => {
  let paddingTop = SCROLLVIEW_PADDING_TOP;
  Object.keys(statements)
    .reverse()
    .forEach((key) => {
      let keyValue = parseInt(key);
      if (SCREEN_HEIGHT < keyValue)
        paddingTop = SCREEN_HEIGHT * statements[key];
    });
  return paddingTop;
};
