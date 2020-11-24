import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import bongo from "../assets/bongo.jpg";
import arrow from "../assets/icons/arrow-next.svg";
import doubleArrow from "../assets/icons/double-arrow-next.svg";
import logo from "../assets/logo.svg";
import { useMonth } from "../providers/MonthProvider";
import { Button } from "./Button";

const Container = styled.header`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  background-color: ${(props) => props.theme.darkLight};
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0.5rem 1.5rem;

  text-align: center;
  font-size: 1em;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const DatePicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-even;

  padding: 0 1.5rem;

  text-align: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Backwards = styled(Icon)`
  transform: rotate(-180deg);
`;

const SelectedMonth = styled.p`
  min-width: 196px;
  margin: 0 1rem;

  font-size: 20px;
  line-height: 1;

  @media screen and (max-width: 768px) {
    min-width: unset;
    font-size: 16px;
  }
`;

const NavButton = styled(Button)`
  && {
    padding: 0.25rem;
  }
`;

const Logo = styled.img`
  height: 32px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ProfilePicture = styled.img`
  border-radius: 50%;

  height: 32px;
  width: 32px;

  background-color: ${(props) => props.theme.grey};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

interface Props {}

export const Header: React.FC<Props> = () => {
  const {
    month,
    nextYear,
    nextMonth,
    previousYear,
    previousMonth,
  } = useMonth();

  return (
    <Container id={"header"}>
      <Logo src={logo} alt="logo" />
      <DatePicker>
        <NavButton
          onClick={() => {
            previousYear();
          }}
          color={"grey"}
        >
          <Backwards src={doubleArrow} />
        </NavButton>
        <NavButton
          onClick={() => {
            previousMonth();
          }}
          color={"grey"}
        >
          <Backwards src={arrow} />
        </NavButton>
        <SelectedMonth>{format(month, "MMMM yyyy")}</SelectedMonth>
        <NavButton
          onClick={() => {
            nextMonth();
          }}
          color={"grey"}
        >
          <Icon src={arrow} />
        </NavButton>
        <NavButton
          onClick={() => {
            nextYear();
          }}
          color={"grey"}
        >
          <Icon src={doubleArrow} />
        </NavButton>
      </DatePicker>
      <ProfilePicture src={bongo} />
    </Container>
  );
};
