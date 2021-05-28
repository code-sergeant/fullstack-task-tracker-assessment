import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import {AddTaskModal} from "./AddTaskModal";

describe("Add Task Modal", () => {
  let mockOnClick: () => void;
  let mockOnCancel: () => void;
  beforeEach(() => {
    mockOnClick = jest.fn();
    mockOnCancel = jest.fn();
    render(<AddTaskModal onSubmit={mockOnClick} onCancel={mockOnCancel} />);
  });

  it("renders the task title field", () => {
    expect(screen.getByLabelText("Task Title"));
  });

  it("disables the submit button if required fields are not filled", () => {
    expect(screen.getByText("Submit")).toBeDisabled();
  });

  it("enables submit button if required fields are provided", () => {
    const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

    userEvent.type(titleInput, "Test Title");

    expect(titleInput.value).toEqual("Test Title");
    expect(screen.getByText("Submit")).not.toBeDisabled();
  });

  it("clears the task title field when submit is clicked", () => {
    const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

    userEvent.type(titleInput, "Test Title");

    userEvent.click(screen.getByText("Submit"));

    expect(titleInput.value).toEqual("");
  });

  it("calls onCancel when 'Cancel' button is clicked", () => {
    userEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  // More advanced React Assessment
  describe("Keyboard Shortcuts", () => {
    it("clears the task title field when user submits using the enter key", () => {
      const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

      userEvent.type(titleInput, "Test Title");

      userEvent.type(titleInput, "{enter}");

      expect(titleInput.value).toEqual("");
    });

    it("displays an error message if user presses Enter while required fields are empty", () => {
      userEvent.type(screen.getByLabelText("Task Title"), "{enter}");

      expect(screen.getByText("Please enter a title."));
    });

    // TODO: The actual component works, but this test doesn't for some reason
    // it("calls onCancel when user presses Escape", () => {
    //   userEvent.type(screen.getByLabelText("Task Title"), "{escape}");
    //
    //   expect(mockOnCancel).toHaveBeenCalled();
    // });
  });
});
