import { FieldHookConfig, useField } from "formik";
import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "./ErrorMessage";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem 2rem 0.75rem;
`;

export const TextArea = (props: FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <Container>
      <CustomTextArea {...field} placeholder={props.placeholder} />
      {hasError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </Container>
  );
};
