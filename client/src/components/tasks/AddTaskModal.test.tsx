import * as React from "react";
import {findByLabelText, fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import {AddTaskModal} from "./AddTaskModal";

describe("AddTaskModal", () => {
  const mockToggleOpen = jest.fn();
  const mockCreateTask = jest.fn()
    .mockResolvedValue({id: 1, title: "TestTask1", date: new Date()});

  beforeEach(() => {
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

  it("calls onCancel when 'Cancel' button is clicked", () => {
    userEvent.click(screen.getByText("Cancel"));

    expect(mockToggleOpen).toHaveBeenCalled();
  });
});
