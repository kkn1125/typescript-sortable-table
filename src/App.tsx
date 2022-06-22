/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import "./App.css";
import SortableTable from "./components/SortableTable";

type Props = {
  color: string;
};

// const color = "white";

const styles = css`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  &:hover {
    color: ${"white"};
  }
`;

const Button = styled("div")<Props>`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  &:hover {
    color: ${(props) => {
      return props.color;
    }};
  }
`;

const RealButton = Button.withComponent("a");

const dataHead = [["구분", "구분", "test"]];
const dataBody = [
  ["a", "3", '테스트 데이터'],
  ["b", "2", 'kimson 테스트 데이터'],
  ["c", "5", 'malcom 테스트 데이터'],
];

const App: FC = () => {
  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };
  return (
    <div className='App'>
      {/* <div css={styles}>test wow</div>
      <RealButton href='#' color='white'>
        test
      </RealButton> */}
      <SortableTable dataHead={dataHead} dataBody={dataBody} fullWidth />
    </div>
  );
};

export default App;
