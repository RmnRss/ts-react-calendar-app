import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  text-align: center;
  font-size: calc(10px + 2vmin);
`;

const Text = styled.p`
  color: ${(props) => props.theme.primary};
`;

const Link = styled.a`
  color: ${(props) => props.theme.secondary};
`;

const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    & {
      animation: spin infinite 20s linear;
    }
  }
`;

function App() {
  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Text>
        Edit <code>src/App.tsx</code> and save to reload.
      </Text>
      <Link
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Link>
    </Container>
  );
}

export default App;
