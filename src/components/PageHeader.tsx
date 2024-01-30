"use client";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";
import GoBack from "./styled/GoBack";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e40ff;
`;
const Title = styled.h1`
  padding: 20px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
`;

export default function PageHeader() {
  const pathname = usePathname();
  let title = "";

  if (pathname === "/add") title = "할 일 추가";
  else if (pathname === "/") title = "할 일 목록";
  else if (pathname.startsWith("/detail")) title = "할 일 상세";
  else title = "에러😕";

  return (
    <Container>
      <Title>{title}</Title>
      {pathname !== "/" && <GoBack href="/">돌아가기</GoBack>}
    </Container>
  );
}
