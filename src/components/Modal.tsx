import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import close from "../assets/icons/close.svg";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Overlay = styled(Column)`
  position: fixed;
  z-index: 3;
  top: 0%;
  left: 0%;

  align-items: center;
  justify-content: center;

  height: 100vh;
  max-width: 100%;

  width: 100vw;
  min-width: 100%;

  background-color: rgba(0, 0, 0, 0.9);
`;

const ModalContainer = styled(Column)`
  height: unset;
  width: 740px;

  padding: 0;

  border-radius: 8px;
  background-color: ${(props) => props.theme.grey};

  overflow: hidden;

  @media screen and (max-width: 1024px) {
    width: 680px;
    min-height: 470px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;

  width: 100%;

  padding: 1rem 2rem;

  background-color: ${(props) => props.theme.darkLight};
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;

  margin: 0 0 0 auto;

  cursor: pointer;
`;

const ModalContent = styled.div`
  width: 100%;
  max-height: 80vh;

  padding: 2rem;

  overflow: auto;

  @media screen and (max-width: 768px) {
    max-height: 100%;
  }
`;

interface Props {
  children: React.ReactNode;
  handleClose: () => void;
  show: boolean;
  title: string;
}

/**
 * Using portals to render an overlay with a modal on top of the element tree
 */
const Modal: React.FC<Props> = ({ show, handleClose, title, children }) =>
  show
    ? ReactDOM.createPortal(
        <Overlay data-testid={"overlay"}>
          <ModalContainer>
            <ModalHeader>
              <h4>{title}</h4>
              <CloseIcon src={close} onClick={() => handleClose()} />
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
          </ModalContainer>
        </Overlay>,
        document.body
      )
    : null;

export default Modal;
