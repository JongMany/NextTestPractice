"use client";
import Button from "@/components/styled/Button";
import { useRouter } from "next/navigation";

type Props = {
  toDo: string;
};

const AddButton = ({ toDo }: Props) => {
  const router = useRouter();

  const clickHandler = () => {
    if (toDo.length === 0) return;
    
    const toDoList = JSON.parse(localStorage.getItem("ToDoList") || "[]");
    if (Array.isArray(toDoList)) {
      localStorage.setItem("ToDoList", JSON.stringify([...toDoList, toDo]));
    }
    router.replace("/");
  };
  return <Button label="추가" onClick={clickHandler} />;
};

export default AddButton;
