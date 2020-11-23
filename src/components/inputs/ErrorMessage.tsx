import React from "react";
import styled from "styled-components";

const Error = styled.p`
  margin: 0.5rem 0;
  font-size: 14px;
  color: ${(props) => props.theme.fail};
`;

interface Props {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<Props> = ({ children }) => {
  return <Error>{children}</Error>;
};
