import { ThemeOptions } from "@mui/material";
import { bodyFonts, buttonFonts, headingFonts } from "./fonts.style";

export const PINK = {
  900: "#89004d",
  800: "#af0054",
  700: "#c40057",
  600: "#d9005c",
  500: "#ea005e",
  400: "#ed2877",
  300: "#f15690",
  200: "#f488b0",
  100: "#f8b7cf",
  50: "#fce3ec",
};

export const GREEN = {
  900: "#008535",
  800: "#00a74b",
  700: "#00b958",
  600: "#00cd66",
  500: "#00de72",
  400: "#00e686",
  300: "#28ed9e",
  200: "#84f2bc",
  100: "#b9f7d6",
  50: "#e2fcef",
};

export const COLORS = {
  MAIN: PINK[400],
  SECONDARY: GREEN[300],
  LIGHT_BACKGROUND: "#efefef",
  LIGHT_PAPER: "#f4f4f5",
  DARK_BACKGROUND: "#0F172A",
  DARK_PAPER: "#1E293B",
  DARK_TEXT: "#29333b",
};

export const THEME: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: COLORS.MAIN,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
    background: {
      default: COLORS.DARK_BACKGROUND,
      paper: COLORS.DARK_PAPER,
    },
  },
  typography: {
    ...bodyFonts,
    button: buttonFonts,
    h1: headingFonts,
    h2: headingFonts,
    h3: headingFonts,
    h4: headingFonts,
    h5: headingFonts,
    h6: headingFonts,
  },
  shape: {
    borderRadius: 16,
  },
};
