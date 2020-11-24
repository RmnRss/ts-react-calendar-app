import { FieldHookConfig, useField } from "formik";
import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "./ErrorMessage";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
`;

const CustomSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;

  background-color: ${(props) => props.theme.darkLight};
  color: ${(props) => props.theme.light};
`;

export const Select = (props: FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <Container>
      <CustomSelect {...field} placeholder={props.placeholder}>
        {props.children}
      </CustomSelect>
      {hasError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </Container>
  );
};
