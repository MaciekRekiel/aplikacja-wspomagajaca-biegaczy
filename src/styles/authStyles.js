import { StyleSheet } from "react-native";
import { colorsAuth } from "./colors";
import { SCROLLVIEW_PADDING_TOP } from "../utils/screen";

export const authStyles = (paddingTop = SCROLLVIEW_PADDING_TOP) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewStyle: {
      paddingTop,
    },
    imageBackgroundStyle: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      backgroundColor: colorsAuth.overlay,
    },
    highlightedText: {
      color: colorsAuth.primary,
      fontWeight: "bold",
    },
  });
