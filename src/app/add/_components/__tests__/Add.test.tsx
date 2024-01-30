import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Add } from "../Add";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { mockRouter } from "@/test-utils/next-router-utils";
import { usePathname, useRouter } from "next/navigation";
import { mock } from "node:test";

const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      replace: jest.fn(),
    };
  },
  usePathname() {
    return mockUsePathname();
  },
}));

/* const useRouter = jest.spyOn(require("next/navigation"), "useRouter");
useRouter.mockImplementation(() => ({
  replace: jest.fn(),
})); */

describe("<Add/>", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renders component correctly", () => {
    render(<Add />, {
      wrapper: MemoryRouterProvider,
    });

    const input = screen.getByPlaceholderText("할 일을 입력해주세요");
    expect(input).toBeInTheDocument();

    const btn = screen.getByText("추가");
    expect(btn).toBeInTheDocument();
  });

  it("add a new ToDo and redirect to the root page", () => {
    render(<Add />, {
      wrapper: MemoryRouterProvider,
    });

    const input = screen.getByPlaceholderText("할 일을 입력해주세요");
    const btn = screen.getByText("추가");

    fireEvent.change(input, { target: { value: "New ToDo" } });
    fireEvent.click(btn);
    expect(localStorage.getItem("ToDoList")).toBe(JSON.stringify(["New ToDo"]));
  });

  it("add a new ToDo and redirect to the root page", async () => {
    localStorage.setItem("ToDoList", JSON.stringify(["Old ToDo"]));
    mockUsePathname.mockImplementation(() => "/add");
    mockRouter.pathname = "/add";
    
    // mocking next/router
    const router = useRouter();
    router.replace = jest.fn().mockImplementation(() => "/");

    render(<Add />, {
      wrapper: MemoryRouterProvider,
    });

    const input = screen.getByPlaceholderText("할 일을 입력해주세요");
    const btn = screen.getByText("추가");

    fireEvent.change(input, { target: { value: "New ToDo" } });
    fireEvent.click(btn);
    expect(localStorage.getItem("ToDoList")).toBe(
      JSON.stringify(["Old ToDo", "New ToDo"])
    );

    await waitFor(() => {
      expect(mockRouter.asPath).toBe("/");
    });
  });

  it("do nothing if the input is empty", async () => {
    localStorage.setItem("ToDoList", JSON.stringify(["Old ToDo"]));
    mockRouter.pathname = "/add";

    const router = useRouter();
    router.replace = jest.fn().mockImplementation(() => "/");

    const TestComponent = () => {
      const pathname = usePathname();
      return <div>{pathname}</div>;
    };

    render(
      <>
        <TestComponent />
        <Add />
      </>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    const url = screen.getByText("/add");
    expect(url).toBeInTheDocument();
    expect(mockRouter.pathname).toBe("/add");
    const btn = screen.getByText("추가");
    fireEvent.click(btn);
    expect(localStorage.getItem("ToDoList")).toBe(JSON.stringify(["Old ToDo"]));

    await waitFor(() => {
      expect(mockRouter.pathname).toBe("/add");
    });
  });
});
