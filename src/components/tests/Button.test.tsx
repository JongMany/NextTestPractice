import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import Button from "../styled/Button";

describe("<Button/>", () => {
  it("renders component correctly", () => {
    render(<Button label="추가" />);

    const button = screen.getByText("추가");
    expect(button).toBeInTheDocument();

    const parent = screen.getByTestId("container");
    expect(parent).toContainElement(button);

    expect(parent).toHaveStyleRule("background-color", "#304ffe");
    expect(parent).toHaveStyleRule("background-color", "#1e40ff", {
      modifier: ":hover",
    });
    expect(parent).toHaveStyleRule(
      "box-shadow",
      "inset 5px 5px 10px rgba(0,0,0,0.2)",
      {
        modifier: ":active",
      }
    );
  });

  it("changes background-color and hover-color props", () => {
    const backgroundColor = "#FF1744";
    const hoverColor = "#F01440";

    render(
      <Button
        label="추가"
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
      />
    );
    const button = screen.getByText("추가");

    const parent = screen.getByTestId("container");
    expect(parent).toContainElement(button);

    expect(parent).toHaveStyleRule("background-color", backgroundColor);
    expect(parent).toHaveStyleRule("background-color", hoverColor, {
      modifier: ":hover",
    });
  });

  it("clicks the button", () => {
    const handleClick = jest.fn();
    render(<Button label="추가" onClick={handleClick} />);

    const label = screen.getByText("추가");
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
