"use client";
import AddContainer from "./AddContainer";
import AddInput from "./AddInput";
import { useState } from "react";
import AddButton from "./AddButton";

export const Add = () => {
  const [toDo, setToDo] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(e.target.value);
  };

  return (
    <AddContainer>
      <AddInput
        placeholder="할 일을 입력해주세요"
        onChange={changeHandler}
        value={toDo}
      />
      {/* <Button label="추가" onClick={addToDo} /> */}
      <AddButton toDo={toDo} />
    </AddContainer>
  );
};
