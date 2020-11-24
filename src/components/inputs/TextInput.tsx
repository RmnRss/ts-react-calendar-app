import { FieldHookConfig, useField } from "formik";
import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "./ErrorMessage";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
`;

const CustomTextField = styled.input`
  width: 100%;
  padding: 0.75rem 0.5rem;

  background-color: ${(props) => props.theme.darkLight};
  color: ${(props) => props.theme.light};
`;

export const TextInput = (props: FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <Container>
      {/* <label htmlFor={props.name}>{label}</label> */}
      <CustomTextField {...field} placeholder={props.placeholder} type="text" />
      {hasError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </Container>
  );
};
