import styled from "@emotion/styled";
import React from "react";

const Span = styled.span`
  color: ${(props: { sort: boolean }) => (props.sort ? "cadetblue" : "tomato")};
`;

function Order({ sort }: { sort: boolean }) {
  return <Span sort={sort}>{sort ? "⬆" : "⬇"}</Span>;
}

export default Order;
