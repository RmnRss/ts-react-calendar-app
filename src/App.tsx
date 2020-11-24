import React from "react";
import styled from "styled-components";
import { Calendar } from "./components/Calendar";
import { Header } from "./components/Header";

const Container = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <Container data-testid={"app-container"}>
      <Header />
      <Calendar />
    </Container>
  );
}

export default App;
