// import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import FormTest from "../../testComponents/SampleTest";

describe("account delete form", () => {
  it("renders default state", () => {
    const { getByTestId, getByLabelText } = render(<FormTest />);

    const password = getByLabelText("Password") as HTMLInputElement;
    const confirm = getByTestId("account-delete-confirm");
    const submit = getByTestId("account-delete-submit");
  });
});
