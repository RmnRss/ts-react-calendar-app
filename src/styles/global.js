import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
  }

  body {
    color: ${(props) => props.theme.light};
    background-color: ${(props) => props.theme.dark};

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  p, 
  a, 
  b {
    font-size: 1em;
  }

  select,
  input,
  textarea {
    overflow: hidden;
    overflow-wrap: break-word;

    background-color: ${(props) => props.theme.light};
    font-weight: 400;
    font-size: 1em;

    outline: none;
    border: 2px solid transparent;
    border-radius: ${(props) => props.theme.radius};

    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${(props) => props.theme.primary};
    }
  }
`;
