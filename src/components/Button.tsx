import React from "react";
import styled from "styled-components";

interface ContainerProps {
  color: string;
  disabled: boolean;
}

const ButtonContainer = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 0.5rem;
  margin: 0.25rem 0.5rem;

  width: max-content;

  background-color: ${(props) =>
    props.disabled ? props.theme.greyDark : props.theme[props.color]};
  border-radius: ${(props) => props.theme.radius};

  overflow: hidden;
  color: ${(props) => props.theme.light};

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    filter: hue-rotate(45deg);
  }

  &:active {
    filter: hue-rotate(90deg);
  }
`;

interface Props {
  className?: string;
  children: React.ReactNode;
  color: string;
  disabled?: boolean;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  color,
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <ButtonContainer
      className={className}
      color={color}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </ButtonContainer>
  );
};
