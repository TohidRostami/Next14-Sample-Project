import "@testing-library/jest-dom";
import QueryProvider from "../../Provider/Provider";
import DeleteModal from "../../components/DeleteModal";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the translation function
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) =>
      key === "deleteQuestion" && options
        ? `Are you sure you want to delete Product ${options.number}?`
        : key,
  }),
}));

describe("unit test for DeleteModal", () => {
  const product = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: "109.95",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  };
  const mockCloseHandler = jest.fn();

  test("See if component render right.", () => {
    render(
      <QueryProvider>
        <DeleteModal
          deleteModal={true}
          handleClose={mockCloseHandler}
          product={product}
        />
      </QueryProvider>
    );

    const text = "Are you sure you want to delete Product 1?";
    const question = screen.getByText(text);
    expect(question).toBeInTheDocument();

    // Check if delete button is rendered
    const deleteButton = screen.getByRole("button", { name: "delete" });
    expect(deleteButton).toBeInTheDocument();
  });

  it("calls handleClose when the back button is clicked", () => {
    render(
      <QueryProvider>
        <DeleteModal
          deleteModal={true}
          handleClose={mockCloseHandler}
          product={product}
        />
      </QueryProvider>
    );

    // Find and click the back button
    const backButton = screen.getByRole("button", { name: "back" });
    // expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    // Verify handleClose was called
    expect(mockCloseHandler).toHaveBeenCalledTimes(1);
  });
});
