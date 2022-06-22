import styled from "@emotion/styled";
import React from "react";

type ButtonProps = {
  color: string;
  variant: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const colorSet: {
  [index: string]: {
    color: string;
    backgroundColor: string;
  };
} = {
  primary: {
    color: "white",
    backgroundColor: "",
  },
  secondary: {
    color: "white",
    backgroundColor: "",
  },
  info: {
    color: "white",
    backgroundColor: "",
  },
  success: {
    color: "white",
    backgroundColor: "",
  },
  danger: {
    color: "white",
    backgroundColor: "",
  },
  warning: {
    color: "white",
    backgroundColor: "",
  },
};

const StyledButton = styled("button")`
  color: ${(props: { color: string }) => colorSet[props.color].color};
`;

StyledButton.defaultProps = {
  color: "info",
};

function Button({ color, variant, onClick, children }: ButtonProps) {
  console.log(variant);
  return (
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: "info",
  variant: "outlined",
};

export default Button;
