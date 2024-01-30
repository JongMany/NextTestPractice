import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import List from "../List";
import { mockRouter } from "@/test-utils/next-router-utils";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";

describe("<List/>", () => {
  beforeEach(() => {
    localStorage.setItem(
      "ToDoList",
      JSON.stringify(["ToDo 1", "ToDo 2", "ToDo 3"])
    );
  });

  afterEach(() => {
    localStorage.removeItem("ToDoList");
    jest.restoreAllMocks();
  });

  it("renders component correctly", () => {
    render(<List />);

    const todo1 = screen.getByText("ToDo 1");
    expect(todo1).toBeInTheDocument();
    const todo2 = screen.getByText("ToDo 2");
    expect(todo2).toBeInTheDocument();
    const todo3 = screen.getByText("ToDo 3");
    expect(todo3).toBeInTheDocument();

    expect(screen.getAllByText("삭제").length).toBe(3);

    const addButton = screen.getByText("+");
    expect(addButton).toBeInTheDocument();
  });

  it("deletes toDo Item", () => {
    render(<List />);

    const todoItems = screen.getAllByTestId("todoItem");
    expect(todoItems.length).toBe(3);

    const deleteButtons = screen.getAllByText("삭제");
    fireEvent.click(deleteButtons[1]);

    const todoItemsAfterDelete = screen.getAllByTestId("todoItem");
    expect(todoItemsAfterDelete.length).toBe(2);
    expect(screen.queryByText("ToDo 2")).not.toBeInTheDocument();

    expect(JSON.parse(localStorage.getItem("ToDoList")!)).not.toContain(
      "ToDo 2"
    );
  });

  it("moves to detail page", async () => {
    render(<List />, {
      wrapper: MemoryRouterProvider,
    });
    const todo1 = screen.getByText("ToDo 2");
    expect(todo1).toHaveAttribute("href", "/detail/1");

    fireEvent.click(todo1);
    // P. 446
    await waitFor(() => {
      expect(mockRouter.pathname).toEqual("/detail/1");
    });
  });

  it("moves to add page", async () => {
    render(<List />, {
      wrapper: MemoryRouterProvider,
    });
    const addButton = screen.getByText("+");
    expect(addButton).toHaveAttribute("href", "/add");

    fireEvent.click(addButton);
    await waitFor(() => {
      expect(mockRouter.pathname).toEqual("/add");
    });
  });
});
