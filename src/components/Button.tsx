import styled from "@emotion/styled";
import React from "react";
import { Theme } from "./ThemeProvider";

type ButtonProps = {
  color: string;
  variant: string;
  gutterTop: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const StyledButton = styled("button")<{
  color: string;
  gutterTop: boolean;
  theme?: Theme;
}>`
  background-color: ${(props) => props.theme.palette[props.color]};
  color: ${(props) => props.theme.text[props.color]};
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  ${(props) => (props.gutterTop ? { marginTop: 15 } : "")}
  font-size: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  &:hover,
  &:focus-within {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

StyledButton.defaultProps = {
  color: "info",
};

function Button({ color, variant, gutterTop, onClick, children }: ButtonProps) {
  return (
    <StyledButton color={color} gutterTop={gutterTop} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: "info",
  variant: "outlined",
  gutterTop: false,
};

export default Button;
