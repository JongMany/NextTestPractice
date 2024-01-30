// https://github.com/vercel/next.js/discussions/42527

import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import PageHeader from "@/components/PageHeader";
import { mockRouter } from "@/test-utils/next-router-utils";
import renderer from "react-test-renderer";

// https://github.com/amannn/next-intl/discussions/331
const mockUsePathname = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe("<PageHeader/>", () => {
  it("renders component correctly", () => {
    mockUsePathname.mockImplementation(() => "/");

    render(<PageHeader />);
    const label = screen.getByText("할 일 목록");
    expect(label).toBeInTheDocument();
    const goBack = screen.queryByText("돌아가기");
    expect(goBack).not.toBeInTheDocument();
  });

  it("renders component correctly snapshot", () => {
    mockUsePathname.mockImplementation(() => "/");
    const tree = renderer.create(<PageHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component correctly when pathname is "/add"', () => {
    mockUsePathname.mockImplementation(() => "/add");
    render(<PageHeader />);

    const label = screen.getByText("할 일 추가");
    expect(label).toBeInTheDocument();
    const goBack = screen.queryByText("돌아가기");
    expect(goBack).toBeInTheDocument();
    expect(goBack).toHaveAttribute("href", "/");
  });

  it("renders component correctly snapshot when pathname is '/add'", () => {
    mockUsePathname.mockImplementation(() => "/add");
    const tree = renderer.create(<PageHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component correctly when pathname is "/detail/:id"', () => {
    mockUsePathname.mockImplementation(() => "/detail/1");

    render(<PageHeader />);
    const label = screen.getByText("할 일 상세");
    expect(label).toBeInTheDocument();
    const goBack = screen.queryByText("돌아가기");
    expect(goBack).toBeInTheDocument();
    expect(goBack).toHaveAttribute("href", "/");
  });

  it("renders component correctly with Error", () => {
    mockUsePathname.mockImplementation(() => "/error");

    render(<PageHeader />);
    const label = screen.getByText("에러😕");
    expect(label).toBeInTheDocument();
    const goBack = screen.queryByText("돌아가기");
    expect(goBack).toBeInTheDocument();
    expect(goBack).toHaveAttribute("href", "/");
  });

  it("renders component correctly with goBack Link", async () => {
    mockUsePathname.mockImplementation(() => "/error");

    render(<PageHeader />, { wrapper: MemoryRouterProvider });

    const goBack = screen.getByText("돌아가기");
    fireEvent.click(goBack);

    // https://www.npmjs.com/package/next-router-mock#example-nextlink-with-react-testing-library
    // 이동한 경로가 "/"인지 확인
    // console.log(mockRouter);
    await waitFor(() => {
      expect(mockRouter.pathname).toEqual("/");
    });
  });
});
