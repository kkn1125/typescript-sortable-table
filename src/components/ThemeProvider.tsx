/** @jsx jsx */
import { ThemeProvider as ThemeProviders, jsx } from "@emotion/react";
import React from "react";

export type Theme = {
  palette: {
    [index: string]: string;
  };
  text: {
    [index: string]: string;
  };
};

const theme: Theme = {
  palette: {
    primary: "#641def",
    secondary: "#a90968",
    info: "#1357ab",
    success: "#146626",
    danger: "#b10e0e",
    warning: "#5e5805",
  },
  text: {
    primary: "#fff",
    secondary: "#fff",
    info: "#fff",
    success: "#fff",
    danger: "#fff",
    warning: "#fff",
  },
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProviders theme={theme}>{children}</ThemeProviders>;
}

export default ThemeProvider;
