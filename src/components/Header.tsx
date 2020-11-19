import React from "react";
import styled from "styled-components";
import bongo from "../assets/bongo.jpg";
import arrow from "../assets/icons/arrow-next.svg";
import doubleArrow from "../assets/icons/double-arrow-next.svg";
import logo from "../assets/logo.svg";
import { Button } from "./Button";

const Container = styled.header`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;

  background-color: ${(props) => props.theme.dark};
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0.5rem 1.5rem;

  text-align: center;
  font-size: 1em;
`;

const Logo = styled.img`
  height: 32px;
`;

const DatePicker = styled.div`
  background-color: ${(props) => props.theme.dark};
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
  margin: 0 1rem;

  font-size: 20px;

  line-height: 1;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;

  height: 32px;
  width: 32px;

  background-color: ${(props) => props.theme.grey};
`;

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <Container id={"header"}>
      <Logo src={logo} alt="logo" />
      <DatePicker>
        <Button color={"greyDark"}>
          <Backwards src={doubleArrow} />
        </Button>
        <Button color={"darkLight"}>
          <Backwards src={arrow} />
        </Button>
        <SelectedMonth>Septembre 2020</SelectedMonth>
        <Button color={"darkLight"}>
          <Icon src={arrow} />
        </Button>
        <Button color={"greyDark"}>
          <Icon src={doubleArrow} />
        </Button>
      </DatePicker>
      <ProfilePicture src={bongo} />
    </Container>
  );
};
