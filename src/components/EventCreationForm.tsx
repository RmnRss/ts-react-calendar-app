import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { getHoursOfADay, setHoursAndMinutes } from "../services/dates";
import IEvent from "../types/IEvent";
import { Button } from "./Button";
import { Select } from "./inputs/Select";
import { TextArea } from "./inputs/TextArea";
import { TextInput } from "./inputs/TextInput";

const FormHolder = styled(Form)`
  display: flex;
  flex-direction: column;

  padding: 1rem 0;

  width: 100%;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;

  width: max-content;

  margin: 1rem 0 0 0;
`;

const SubmitButton = styled(Button)`
  margin: 0 0 0 1rem;
`;

const EventSchema = Yup.object().shape({
  startingHour: Yup.number().required("Required"),
  endingHour: Yup.number()
    .required("Required")
    .when("startingHour", (startingHour: number) =>
      Yup.number().min(startingHour, "An event must end after it started.")
    ),
  description: Yup.string()
    .min(2, "Description must contain at least 3 characters")
    .max(280, "Description must contain less than 280 characters")
    .required("Required"),
  title: Yup.string()
    .min(2, "Title must contain at least 3 characters")
    .max(140, "Title must be shorter than 140 characters")
    .required("Required"),
});

interface Props {
  date: Date;
  createEvent: (event: IEvent) => void;
}

export const EventCreationForm: React.FC<Props> = ({ date, createEvent }) => (
  <Formik
    initialValues={{
      startingHour: 8,
      endingHour: 9,
      description: "",
      title: "",
    }}
    validationSchema={EventSchema}
    onSubmit={(values) => {
      const newEvent: IEvent = {
        id: Date.now(),
        dateTimeStart: setHoursAndMinutes(date, values.startingHour),
        dateTimeEnd: setHoursAndMinutes(date, values.endingHour),
        description: values.description,
        title: values.title,
      };

      createEvent(newEvent);
    }}
  >
    {({ isSubmitting, isValid, isValidating }) => (
      <FormHolder>
        <label htmlFor={"title"}>Name</label>
        <TextInput name={"title"} />

        <label htmlFor={"startingHour"}>Start</label>
        <Select name="startingHour">
          {getHoursOfADay(date).map((item) => (
            <option key={item.key} value={item.value}>
              {item.key}
            </option>
          ))}
        </Select>

        <label htmlFor={"endingHour"}>End</label>
        <Select name="endingHour">
          {getHoursOfADay(date).map((item) => (
            <option key={item.key} value={item.value}>
              {item.key}
            </option>
          ))}
        </Select>

        <label htmlFor={"description"}>Description</label>
        <TextArea name="description" />

        <ActionButtons>
          <SubmitButton color={"primary"} type="reset">
            Reset
          </SubmitButton>

          <SubmitButton
            color={"primary"}
            disabled={isSubmitting || isValidating || !isValid}
            type="submit"
          >
            Create Event
          </SubmitButton>
        </ActionButtons>
      </FormHolder>
    )}
  </Formik>
);
