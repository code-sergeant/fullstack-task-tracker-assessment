import * as React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {TaskListItem} from "./TaskListItem";
import userEvent from "@testing-library/user-event";

jest.mock("../../api/getAllTasksApi.ts").fn().mockResolvedValue({data: {_embedded: {tasks: []}}})

describe("TaskListItem", () => {
  let mockDeleteTask: (taskId: number) => Promise<void>

  beforeEach(() => {
    mockDeleteTask = jest.fn().mockResolvedValue({})
    render(
      <TaskListItem
        task={{
          id: 1, title: "Task 1", date: new Date(2021, 1, 1)
        }}
        deleteTask={mockDeleteTask}
      />)
  })

  it("correctly renders a Task List Item", async () => {
    expect(await screen.findByText("Task 1"));
    expect(await screen.findByText("Mon Feb 01 2021"));
  });
  it('calls deleteTask when the delete button is clicked', () => {
    userEvent.click(screen.getByText("Delete"))

    expect(mockDeleteTask).toHaveBeenCalled()
  });
});
