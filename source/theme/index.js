//@flow
import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: "#f23c44",
    background: "#fff",
    placeholder: "grey",
    error: "red"
  },
  fonts: {
    thin: "Roboto Thin",
    light: "Roboto Light",
    regular: "Roboto",
    medium: "Roboto Medium"
  }
};

export default theme;
