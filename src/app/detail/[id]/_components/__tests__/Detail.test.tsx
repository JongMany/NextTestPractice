import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { mockRouter } from "@/test-utils/next-router-utils";
import Detail from "../Detail";

describe("<Detail />", () => {
  it("renders component correctly", () => {
    localStorage.setItem("ToDoList", JSON.stringify(["ToDo 1", "ToDo 2"]));
    mockRouter.pathname = "/detail/1";

    render(<Detail id={"1"} />, {
      wrapper: MemoryRouterProvider,
    });

    const toDoItem = screen.getByText("ToDo 2");
    expect(toDoItem).toBeInTheDocument();

    const button = screen.getByText("삭제");
    expect(button).toBeInTheDocument();
  });

  it("redirect to Not Found page if todo id is wrong", async () => {
    localStorage.clear();
    mockRouter.pathname = "/detail/1";

    mockRouter.replace = jest.fn().mockImplementation(() => "/404");

    render(<Detail id={"1"} />, {
      wrapper: MemoryRouterProvider,
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith("/404");
    });
  });

  it("delete a ToDo and redirect to the List page", async () => {
    localStorage.setItem("ToDoList", JSON.stringify(["ToDo 1", "ToDo 2"]));
    mockRouter.pathname = "/detail/1";

    mockRouter.replace = jest.fn().mockImplementation(() => "/");

    render(<Detail id={"1"} />, {
      wrapper: MemoryRouterProvider,
    });

    const button = screen.getByText("삭제");
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        JSON.parse(localStorage.getItem("ToDoList") as string)
      ).not.toContain("ToDo 2");
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith("/");
    });
  });
});
