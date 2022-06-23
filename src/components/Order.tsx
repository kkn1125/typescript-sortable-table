import styled from "@emotion/styled";
import React from "react";

const Span = styled.span`
  color: ${(props: { sort: boolean }) => (props.sort ? "cadetblue" : "tomato")};
`;

type OrderProps = {
  sort: boolean;
  ascIcon: string;
  descIcon: string;
};

function Order({ sort, ascIcon, descIcon }: OrderProps) {
  return <Span sort={sort}>{sort ? ascIcon : descIcon}</Span>;
}

export default Order;
