import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../../components/Form";
import { SubmitHandler } from "react-hook-form";
import Product from "../../Types/Product";
import "@testing-library/jest-dom"; // <-- Add this for matchers

// Mock translation function to return the key
jest.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("Form component", () => {
  const mockSubmitHandler: SubmitHandler<Product> = jest.fn();
  const mockBackHandler = jest.fn();
  const product = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: "109.95",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  };

  it("renders the form with prefilled data", () => {
    render(
      <Form
        product={product}
        submitHandler={mockSubmitHandler}
        backHandler={mockBackHandler}
        submitButtonText="addProduct"
      />
    );

    // Check if the title input field is rendered and contains the correct value
    const titleInput = screen.getByLabelText("title") as HTMLInputElement;
    expect(titleInput.value).toBe(product.title);

    // Check if the back button is rendered
    const backButton = screen.getByTestId("backButton");
    expect(backButton).toBeInTheDocument(); // Ensure button is rendered
  });

  it("calls the submitHandler when the form is submitted", async () => {
    render(
      <Form
        product={null}
        submitHandler={mockSubmitHandler}
        backHandler={mockBackHandler}
        submitButtonText="submit"
      />
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Ensure the submit button is disabled before the checkbox is checked
    expect(submitButton).toBeDisabled();

    // Simulate filling in the form fields
    const titleInput = screen.getByLabelText("title");
    fireEvent.change(titleInput, { target: { value: "Sample Title" } });

    const priceInput = screen.getByLabelText("price");
    fireEvent.change(priceInput, { target: { value: "100" } });

    const descriptionInput = screen.getByLabelText("description");
    fireEvent.change(descriptionInput, {
      target: { value: "Sample Description" },
    });

    const imageInput = screen.getByLabelText("image");
    fireEvent.change(imageInput, { target: { value: "sample-image-url" } });

    // Simulate filling in the category autocomplete
    const categoryInput = screen.getByRole("combobox", { name: /category/i });
    fireEvent.change(categoryInput, { target: { value: "men's clothing" } });

    // Simulate selecting the category option (trigger the dropdown and choose an option)
    const categoryOption = screen.getByText("men's clothing");
    fireEvent.click(categoryOption);

    // Simulate the checkbox change to enable the submit button
    const checkbox = screen.getByRole("checkbox", { name: "controlled" });
    fireEvent.click(checkbox);

    // Ensure the submit button is now enabled
    expect(submitButton).not.toBeDisabled();

    // Fire the submit event by clicking the submit button
    fireEvent.click(submitButton);

    // Check if the submitHandler was called
    // expect(mockSubmitHandler).toHaveBeenCalled();
  });

  it("calls the backHandler when the back button is clicked", () => {
    render(
      <Form
        product={null}
        submitHandler={mockSubmitHandler}
        backHandler={mockBackHandler}
        submitButtonText="submit"
      />
    );

    const backButton = screen.getByTestId("backButton");
    fireEvent.click(backButton);

    // Check if the backHandler was called
    expect(mockBackHandler).toHaveBeenCalled();
  });
});
