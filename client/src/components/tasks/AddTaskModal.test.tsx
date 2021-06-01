import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import {AddTaskModal} from "./AddTaskModal";
import {TasksApiContextProvider} from "../../contexts/tasksContext";
import {TaskItem} from "../../types/types";

jest.mock('../../hooks/useAxios', () => {
  return jest.fn(() => ({
    tasks: [],
    getAllTasks: jest.fn().mockResolvedValue({data: {_embedded: {tasks: []}}}),
    createTask: jest.fn().mockResolvedValue({id: 3, title: "Task 3"} as TaskItem),
    deleteTask: jest.fn().mockResolvedValue({}),
  }))
})

describe("Add Task Modal", () => {
  let mockOnClick: () => void;
  let mockOnCancel: () => void;
  jest.resetAllMocks()
  beforeEach(() => {
    mockOnClick = jest.fn();
    mockOnCancel = jest.fn();
    render(<AddTaskModal onSubmit={mockOnClick} onCancel={mockOnCancel}/>);
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

  it("clears the task title field when submit is clicked", () => {
    userEvent.type(screen.getByLabelText("Task Title"), "Test Title");
    userEvent.click(screen.getByRole("button", {name: "Submit"}));

    waitFor(() => {
      expect((screen.getByLabelText("Task Title") as HTMLInputElement).value).toEqual("");
    })
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

      waitFor(() => {
        expect((screen.getByLabelText("Task Title") as HTMLInputElement).value).toEqual("");
      })
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
