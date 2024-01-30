"use client";

import { useEffect, useState } from "react";
import DetailContainer from "./DetailContainer";
import ToDo from "./ToDo";
import { useRouter } from "next/navigation";
import Button from "@/components/styled/Button";

type Props = {
  id: string;
};

export default function Detail({ id }: Props) {
  const [toDo, setToDo] = useState("");
  const router = useRouter();

  useEffect(() => {
    const toDoList = JSON.parse(localStorage.getItem("ToDoList") || "[]");
    if (toDoList[id]) {
      setToDo(toDoList[id]);
    } else {
      router.replace("/404");
    }
  }, [id, router]);

  const onDelete = () => {
    const toDoList: string[] = JSON.parse(
      localStorage.getItem("ToDoList") || "[]"
    );
    const list = toDoList.filter((_, i) => i !== parseInt(id));
    localStorage.setItem("ToDoList", JSON.stringify(list));
    router.replace("/");
  };

  return (
    <DetailContainer>
      <ToDo>{toDo}</ToDo>
      <Button
        label="삭제"
        backgroundColor="#FF1744"
        hoverColor="#F01440"
        onClick={onDelete}
      />
    </DetailContainer>
  );
}
