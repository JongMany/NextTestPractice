"use client";
import React from "react";
import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";

type Props = {
  readonly label: string;
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
  readonly onClick?: () => void;
};

const Label = styled.div`
  color: #ffffff;
  font-size: 16px;
`;

export default function Button({
  label,
  backgroundColor = "#304ffe",
  hoverColor = "#1e40ff",
  onClick,
}: Props) {
  return (
    <ButtonContainer
      data-testid="container"
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      onClick={onClick}
    >
      <Label>{label}</Label>
    </ButtonContainer>
  );
}
