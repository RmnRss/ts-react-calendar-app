import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;

    light: string;

    grey: string;
    greyDark: string;

    dark: string;
    darkLight: string;

    radius: string;
  }
}

const Theme: DefaultTheme = {
  primary: "#E373FF",
  secondary: "#61dafb",

  light: "#FFF",

  grey: "#DEDEDE",
  greyDark: "#5A5A5A",

  dark: "#000",
  darkLight: "#282c34",

  radius: "4px",
};

export default Theme;
