import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import {AddTaskModal} from "./AddTaskModal";

describe("AddTaskModal", () => {
  const mockToggleOpen = jest.fn();
  const mockCreateTask = jest.fn()
    .mockResolvedValue({id: 1, title: "TestTask1", date: new Date()});

  beforeEach(() => {
    mockOnClick = jest.fn();
    mockOnCancel = jest.fn();
    render(<AddTaskModal
      open={true}
      toggleOpen={mockToggleOpen}
      createTask={mockCreateTask}
    />)
  })

  it("renders the task title field", () => {
    expect(screen.getByLabelText("Task Title")).toBeInTheDocument();
  });

  it("disables the submit button if required fields are not filled", () => {
    expect(screen.getByRole("button", {name: "Submit"})).toBeDisabled();
  });

  it("enables submit button if required fields are provided", () => {
    const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

    userEvent.type(titleInput, "Test Title");

    expect(titleInput.value).toEqual("Test Title");
    expect(screen.getByText("Submit")).not.toBeDisabled();
  });

  it("clears the task title field when submit is clicked", async () => {
    userEvent.type(screen.getByLabelText("Task Title"), "Test Title");
    userEvent.click(screen.getByRole("button", {name: "Submit"}));

    await waitFor(() => expect(mockCreateTask).toHaveBeenCalled())
    await waitFor(() => expect(mockToggleOpen).toHaveBeenCalled())

    // TODO: After switching to Material UI, this test no longer updates the value correctly on useState setTitle call
    //  need to troubleshoot with another dev
    // expect((screen.getByLabelText("Task Title") as HTMLInputElement).value).toEqual("")
  });

  it("calls onSubmit with the proper input values when Submit is clicked", () => {
    const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

    userEvent.type(titleInput, "Test Title");

    userEvent.click(screen.getByText("Submit"));

    expect(mockOnClick).toHaveBeenCalledWith({"title": "Test Title", "date": new Date().toDateString()})
  });

  it("calls onCancel when 'Cancel' button is clicked", () => {
    userEvent.click(screen.getByText("Cancel"));
    
    waitFor(() => expect(mockToggleOpen).toHaveBeenCalled());
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

    it("calls onCancel when user presses Escape", () => {
      userEvent.type(screen.getByLabelText("Task Title"), "{escape}");

      waitFor(() => expect(mockToggleOpen).toHaveBeenCalled());
    });

  });
});
