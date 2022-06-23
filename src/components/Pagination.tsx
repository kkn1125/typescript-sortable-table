import styled from "@emotion/styled";
import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  limit: number;
  handlePage: (e: React.MouseEvent<HTMLLIElement>, i: number) => void;
};

const Pages = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  gap: 5px;
  margin-top: 1rem;
`;

const Page = styled.li<{ isNow: boolean }>`
  cursor: pointer;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${(props) => (props.isNow ? "#ccc" : "#eee")};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

function Pagination({ page, totalPages, limit, handlePage }: PaginationProps) {
  return (
    <Pages>
      {new Array(Math.ceil(totalPages / limit)).fill(0).map((e, i) => (
        <Page
          key={i}
          onClick={(e) => handlePage(e, i + 1)}
          isNow={page === i + 1}>
          {i + 1}
        </Page>
      ))}
    </Pages>
  );
}

export default Pagination;
