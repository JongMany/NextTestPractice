import { render, screen } from "@testing-library/react";
import NotFoundPage from "../page";

describe("<NotFound/>", () => {
  it("renders component correctly", () => {
    render(<NotFoundPage />);

    const message = screen.getByText("404 Not Found");
    expect(message).toBeInTheDocument();
  });
});
