import * as React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {TaskList} from "./TaskList";
import {TasksApiContextProvider} from "../../contexts/tasksContext";

jest.mock("../../api/getAllTasksApi.ts").fn().mockResolvedValue({data: {_embedded: {tasks: []}}})

describe("TaskList", () => {
  it("displays a default message when no tasks have been provided", async () => {
    render(
      <TasksApiContextProvider overrides={{
        tasks: []
      }}>
        <TaskList/>
      </TasksApiContextProvider>
    );

    expect(await screen.findByText("No tasks have been added yet."));
  });

  it("correctly renders a list of TaskItems when provided", async () => {
    render(
      <TasksApiContextProvider overrides={{
        tasks:
          [
            {id: 1, title: "Task 1", date: new Date(2021, 1, 1)},
            {id: 2, title: "Task 2", date: new Date(2021, 1, 2)}
          ]
      }}>
        <TaskList/>
      </TasksApiContextProvider>
    );

    expect((await screen.findByTestId("task-list")).children.length).toEqual(2);
  });
});
