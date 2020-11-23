import React from "react";
import styled from "styled-components";
import { Calendar } from "./components/Calendar";
import { Header } from "./components/Header";

const Container = styled.header`
  min-height: 100vh;
`;

function App() {
  return (
    <Container>
      <Header />
      <Calendar />
    </Container>
  );
}

export default App;
