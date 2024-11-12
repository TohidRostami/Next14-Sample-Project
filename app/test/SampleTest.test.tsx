import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormTest from "../../testComponents/SampleTest"; // Adjust the path if needed

describe("FormTest Component", () => {
  it("renders the password input, checkbox, and submit button", () => {
    render(<FormTest />);

    // Check if the password input, checkbox, and submit button are present
    const passwordInput = screen.getByTestId("account-delete-password");
    const confirmCheckbox = screen.getByTestId("account-delete-confirm");
    const submitButton = screen.getByTestId("account-delete-submit");

    expect(passwordInput).toBeInTheDocument();
    expect(confirmCheckbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("disables submit button initially", () => {
    render(<FormTest />);
    const submitButton = screen.getByTestId("account-delete-submit");

    // Submit button should be disabled initially
    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button when both password and checkbox are filled", () => {
    render(<FormTest />);

    const passwordInput = screen.getByTestId("account-delete-password");
    const confirmCheckbox = screen.getByTestId("account-delete-confirm");
    const submitButton = screen.getByTestId("account-delete-submit");

    // Enter password and select the checkbox to enable the submit button
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(confirmCheckbox);

    expect(submitButton).toBeEnabled();
  });

  it("disables the submit button if the password is cleared", () => {
    render(<FormTest />);

    const passwordInput = screen.getByTestId("account-delete-password");
    const confirmCheckbox = screen.getByTestId("account-delete-confirm");
    const submitButton = screen.getByTestId("account-delete-submit");

    // Fill out form to enable submit, then clear password to disable it again
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(confirmCheckbox);
    expect(submitButton).toBeEnabled();

    fireEvent.change(passwordInput, { target: { value: "" } });
    expect(submitButton).toBeDisabled();
  });

  it("disables the submit button if the checkbox is unchecked", () => {
    render(<FormTest />);

    const passwordInput = screen.getByTestId("account-delete-password");
    const confirmCheckbox = screen.getByTestId("account-delete-confirm");
    const submitButton = screen.getByTestId("account-delete-submit");

    // Fill out form, uncheck the checkbox to disable submit button
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(confirmCheckbox);
    expect(submitButton).toBeEnabled();

    fireEvent.click(confirmCheckbox);
    expect(submitButton).toBeDisabled();
  });
});
