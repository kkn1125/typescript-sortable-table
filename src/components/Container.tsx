import styled from "@emotion/styled";
import React from "react";

type BreakPoints = {
  [index: string]: string;
};

const breakpoints: BreakPoints = {
  xs: "70%",
  sm: "75%",
  md: "80%",
  lg: "85%",
  xl: "90%",
  desktop: "95%",
};

type ContainerBlockProps = {
  maxWidth: string;
};

interface ContainerProps extends ContainerBlockProps {
  children: React.ReactNode;
}

const ContainerBlock = styled.div`
  width: ${(props: ContainerBlockProps) => breakpoints[props.maxWidth]};
  margin: auto;
`;

function Container({ maxWidth, children }: ContainerProps) {
  return <ContainerBlock maxWidth={maxWidth}>{children}</ContainerBlock>;
}

Container.defaultProps = {
  maxWidth: "desktop",
};

export default Container;
