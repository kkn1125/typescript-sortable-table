import styled, { StyledTags } from "@emotion/styled";
import React, { useState } from "react";
import Button from "./Button";
import Order from "./Order";

type DataHead = string[][];
type DataBody = string[][];

const Table = styled.table`
  border-collapse: collapse;
  ${(props: { fullWidth: boolean }) =>
    props.fullWidth ? { width: "100%" } : {}}
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
  & tr:last-child {
    border-bottom: none;
  }
`;

const Row = styled.tr`
  border-bottom-width: 1px;
  border-bottom-color: rgba(200, 200, 200);
  border-bottom-style: solid;
`;

const Th = styled.th``;

const Td = styled.td`
  transition: 150ms ease-in-out;
  &:hover {
    backdrop-filter: brightness(0.95);
  }
`;

function SortableTable({
  dataHead,
  dataBody,
  fullWidth = false,
}: {
  dataHead: DataHead;
  dataBody: DataBody;
  fullWidth?: boolean;
}) {
  const copyData = () => JSON.parse(JSON.stringify(dataBody));
  const [data, setData] = useState<DataBody>(copyData() || [[]]);
  const headLength = dataHead[0].length;
  const bodyLength = data[0].length;
  const maxLength = Math.max(headLength, bodyLength);
  const [toggle, setToggle] = useState(new Array(maxLength).fill(false));

  const createEmpty = (length: number, type: string) =>
    new Array(length)
      .fill("")
      .map((e, idx) => (type === "th" ? <Th key={idx} /> : <Td key={idx} />));

  const sorting = (column: number): DataBody => {
    return data.sort((a: string[], b: string[]): number => {
      return a[column] > b[column]
        ? toggle[column]
          ? 1
          : -1
        : a[column] < b[column]
        ? toggle[column]
          ? -1
          : 0
        : 0;
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    setData(copyData());
    setToggle(toggle.map(() => false));
  };

  const handleToggleSort = (e: React.MouseEvent, column: number) => {
    setToggle(toggle.map((e, i) => (i === column ? !e : false)));
    setData(sorting(column));
  };

  const compareWithOrigin = (): boolean => {
    const compare = copyData();
    return data.some((item, idx) =>
      item.some((it, id) => it !== compare[idx][id])
    );
  };

  return (
    <div>
      <Table fullWidth={fullWidth}>
        <Thead>
          {dataHead.map((rows, hid) => (
            <Row key={hid}>
              {rows.map((name, rid) => (
                <Th key={rid} onClick={(e) => handleToggleSort(e, rid)}>
                  {name}
                  <Order sort={toggle[rid]} />
                </Th>
              ))}
              {createEmpty(maxLength - rows.length, "th")}
            </Row>
          ))}
        </Thead>
        <Tbody>
          {data.map((rows, bid) => (
            <Row key={bid}>
              {rows.map((name, rid) => (
                <Td key={rid}>{name}</Td>
              ))}
              {createEmpty(maxLength - rows.length, "td")}
            </Row>
          ))}
        </Tbody>
      </Table>
      {compareWithOrigin() && <Button onClick={handleReset}>reset</Button>}
    </div>
  );
}

export default SortableTable;
