import * as React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {TaskList} from "./TaskList";

describe("TaskList", () => {
  it("displays a default message when no tasks have been provided", async () => {
    render(<TaskList tasks={[]} deleteTask={jest.fn()}/>);

    expect(await screen.findByText("No tasks have been added yet."));
  });

  it("correctly renders a list of TaskItems when provided", async () => {
    render(
      <TaskList
        tasks={[
            {id: 1, title: "Task 1", date: new Date(2021, 1, 1).toDateString()},
            {id: 2, title: "Task 2", date: new Date(2021, 1, 2).toDateString()}
          ]}
        deleteTask={jest.fn()}
      />);

    expect((await screen.findByTestId("task-list")).children.length).toEqual(2);
  });
});
