"use client";
import styled from "styled-components";

type Props = {
  readonly backgroundColor: string;
  readonly hoverColor: string;
};

const ButtonContainer = styled.div<Props>`
  text-align: center;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export default ButtonContainer;
