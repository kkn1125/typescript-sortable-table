import React from "react";
import "./App.css";
import Container from "./components/Container";
import SortableTable from "./components/SortableTable";
import { data } from "./dummy/dummy";

function App() {
  return (
    <Container>
      <SortableTable sameIntervals tableData={data} fullWidth />
    </Container>
  );
}

export default App;
