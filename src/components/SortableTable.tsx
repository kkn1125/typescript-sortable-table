import styled, { StyledTags } from "@emotion/styled";
import React, { useContext, useState } from "react";
import Button from "./Button";
import Order from "./Order";
import Pagination from "./Pagination";

export type TableData = {
  [index: string]: string | number;
  id: number;
  name: string;
  email: string;
  address: string;
  date: string;
  company: string;
  time: string;
};

type SortableTable = {
  sameIntervals: boolean;
  tableData: TableData[];
  fullWidth?: boolean;
  ascIcon: string;
  descIcon: string;
};

const Table = styled.table<{ fullWidth: boolean; sameIntervals: boolean }>`
  border-collapse: collapse;
  ${(props) => (props.fullWidth ? { width: "100%" } : {})}
  ${(props) =>
    props.sameIntervals
      ? {
          "& tr": {
            display: "flex",
            "& th, & td": {
              flex: 1,
            },
          },
        }
      : ""}
  & tbody {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }
  & th,
  & td {
    padding: 1rem;
  }
`;

const Thead = styled.thead`
  & tr:last-child {
    border-bottom-width: 2px;
    border-bottom-color: rgba(180, 180, 180);
  }
`;

const Tbody = styled.tbody`
  transition: all 500ms ease-in-out;
  & tr:last-child {
    border-bottom: none;
  }
`;

const Row = styled.tr<{ order?: number; limit?: number }>`
  transform: translateY(
    ${(props) => props.order && props.limit && props.order % props.limit}%
  );
  border-bottom-width: 1px;
  border-bottom-color: rgba(200, 200, 200);
  border-bottom-style: solid;
  transition: all 500ms ease-in-out;
`;

Row.defaultProps = {
  order: 0,
  limit: 10,
};

const Th = styled.th`
  cursor: pointer;
  user-select: none;
`;

const Td = styled.td`
  transition: 150ms ease-in-out;
  &:hover {
    backdrop-filter: brightness(0.95);
  }
`;

const limit = 10;

function SortableTable({
  sameIntervals,
  tableData,
  fullWidth = false,
  ascIcon,
  descIcon,
}: SortableTable) {
  const copyData = () => JSON.parse(JSON.stringify(tableData));
  const [data, setData] = useState<TableData[]>(copyData() || [[]]);
  const [totalPages, setTotalPages] = useState(data.length);
  const [page, setPage] = useState(1);
  const limitData = data.slice((page - 1) * limit, page * limit);
  const headers = Object.keys(tableData[0]);
  const [toggle, setToggle] = useState(
    Object.fromEntries(headers.map((k) => [k, false]))
  );
  const sorting = (column: string): void /* TableData[] */ => {
    const result = JSON.parse(JSON.stringify(data)).sort(
      (a: TableData, b: TableData): number => {
        return a[column] > b[column]
          ? toggle[column]
            ? 1
            : -1
          : a[column] < b[column]
          ? toggle[column]
            ? -1
            : 0
          : 0;
      }
    );

    setData(
      data.map((item, idx) => {
        const { id, ...rest } = result[idx];
        item = { ...item, ...rest };
        return item;
      })
    );
  };

  const handleReset = (e: React.MouseEvent) => {
    setData(copyData());
    setToggle(
      Object.fromEntries(Object.entries(toggle).map(([k, v]) => [k, false]))
    );
  };

  const handleToggleSort = (e: React.MouseEvent, column: string) => {
    setToggle({
      ...Object.fromEntries(Object.entries(toggle).map(([k, v]) => [k, false])),
      [column]: !toggle[column],
    });
    sorting(column);
    // setData(sorting(column));
  };

  const handlePage = (
    e: React.MouseEvent<HTMLLIElement>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
  };

  const compareWithOrigin = (): boolean => {
    const compare = copyData();
    return data.some((item, idx) =>
      Object.entries(item).some(([k, v]) => {
        return v !== compare[idx][k];
      })
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Sortable Table Test with TypeScript, Emotion styled
      </h1>
      <Table sameIntervals={sameIntervals} fullWidth={fullWidth}>
        <Thead>
          <Row>
            {headers.map((name, hid) => (
              <Th key={hid} onClick={(e) => handleToggleSort(e, name)}>
                {name}
                <Order
                  sort={toggle[name]}
                  ascIcon={ascIcon}
                  descIcon={descIcon}
                />
              </Th>
            ))}
          </Row>
        </Thead>
        <Tbody>
          {limitData.map((rows, bid) => (
            <Row key={bid} order={rows.id} limit={limit}>
              {Object.entries(rows).map(([name, value], rid) => (
                <Td key={rid}>{value}</Td>
              ))}
            </Row>
          ))}
        </Tbody>
      </Table>
      <Pagination
        page={page}
        totalPages={totalPages}
        limit={limit}
        handlePage={handlePage}
      />
      {compareWithOrigin() && (
        <Button color='info' gutterTop onClick={handleReset}>
          reset
        </Button>
      )}
    </div>
  );
}

SortableTable.defaultProps = {
  ascIcon: "⬆",
  descIcon: "⬇",
  sameIntervals: false,
};

export default SortableTable;
