import { StyleSheet } from "react-native";
import { colorsAuth } from "./colors";
import { calculatePaddingTop } from "../utils/screen";

const SCROLLVIEW_PADDING_TOP = calculatePaddingTop({
  750: 0.15,
  700: 0.1,
  650: 0.5,
});

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
    header: {
      fontSize: 32,
      color: colorsAuth.secondary,
    },
    description: {
      fontSize: 16,
      color: colorsAuth.secondary,
    },
  });
