"use client";
import Link from "next/link";
import styled from "styled-components";

const AddButton = styled(Link)`
  display: inline-block;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  background-color: #304ffe;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  &:hover {
    background-color: #1e40ff;
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export default AddButton;
