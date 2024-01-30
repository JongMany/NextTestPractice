"use client";
import React, { useEffect, useState } from "react";
import ListContainer from "./styled/ListContainer";
import TodoItem from "./styled/ToDoItem";
import Button from "./styled/Button";

import ToDoList from "./styled/ToDoList";
import AddButton from "./styled/AddButton";
import ItemLabel from "./styled/ItemLabel";

export default function List() {
  const [toDoList, setToDoList] = useState<string[]>([]);

  useEffect(() => {
    const list = localStorage.getItem("ToDoList");
    if (list) {
      setToDoList(JSON.parse(list));
    }
  }, []);

  const onDelete = (index: number) => {
    const list = toDoList.filter((_, i) => i !== index);
    setToDoList(list);
    localStorage.setItem("ToDoList", JSON.stringify(list));
  };

  return (
    <ListContainer>
      <ToDoList>
        {toDoList.map((todo, index) => (
          <TodoItem key={todo + index} data-testid="todoItem">
            <ItemLabel href={`/detail/${index}`}>{todo}</ItemLabel>
            <Button
              label="삭제"
              backgroundColor="#FF1744"
              hoverColor="#F01440"
              onClick={() => onDelete(index)}
            />
          </TodoItem>
        ))}
      </ToDoList>
      <AddButton href="/add">+</AddButton>
    </ListContainer>
  );
}
