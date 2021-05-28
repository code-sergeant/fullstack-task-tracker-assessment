import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import {AddTaskModal} from "./AddTaskModal";
import {TasksApiContextProvider} from "../../contexts/tasksContext";
import {TaskItem} from "../../types/types";

describe("Add Task Modal", () => {
  let mockOnClick: () => void;
  let mockOnCancel: () => void;
  beforeEach(() => {
    mockOnClick = jest.fn();
    mockOnCancel = jest.fn();
    render(
      <TasksApiContextProvider overrides={{
        tasks:
          [
            {id: 1, title: "Task 1", date: new Date(2021, 1, 1)},
            {id: 2, title: "Task 2", date: new Date(2021, 1, 2)}
          ],
        createTask: jest.fn().mockResolvedValue({id: 3, title: "Task 3"} as TaskItem)
      }}>
        <AddTaskModal onSubmit={mockOnClick} onCancel={mockOnCancel}/>);
      </TasksApiContextProvider>
    );
  })

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

  it("clears the task title field when submit is clicked", async () => {
    userEvent.type(screen.getByLabelText("Task Title"), "Test Title");

    userEvent.click(screen.getByText("Submit"));

    expect((await screen.findByLabelText("Task Title") as HTMLInputElement).value).toEqual("");
  });

  it("calls onCancel when 'Cancel' button is clicked", () => {
    userEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  // More advanced React Assessment
  describe("Keyboard Shortcuts", () => {
    it("clears the task title field when user submits using the enter key", async () => {
      const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

      userEvent.type(titleInput, "Test Title");
      userEvent.type(titleInput, "{enter}");

      expect((await screen.findByLabelText("Task Title") as HTMLInputElement).value).toEqual("");
    });

    it("displays an error message if user presses Enter while required fields are empty", () => {
      userEvent.type(screen.getByLabelText("Task Title"), "{enter}");

      expect(screen.getByText("Please enter a title."));
    });

    it("calls onCancel when user presses Escape", () => {
      userEvent.type(screen.getByLabelText("Task Title"), "{escape}");

      waitFor(() => {
        expect(mockOnCancel).toHaveBeenCalled();
      })
    });
  });
});
