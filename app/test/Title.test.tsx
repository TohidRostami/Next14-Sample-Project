import Title from "../../components/Title";
import { render, screen } from "@testing-library/react";

describe("Checking if there's a Title or not", () => {
  test("Test for finding title", () => {
    const testText = "Test Title";

    render(<Title>{testText}</Title>);

    const titleElement = screen.getByText(testText);
    expect(titleElement).toBeInTheDocument();
  });
});
