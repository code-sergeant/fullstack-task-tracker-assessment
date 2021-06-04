import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {TaskListItem} from "./TaskListItem";

describe("TaskListItem", () => {
  it("correctly renders a Task List Item", async () => {
    render(<TaskListItem title="Task 1" date={new Date(2021, 1, 1).toDateString()} />);

    expect(await screen.findByText("Task 1"));
    expect(await screen.findByText("Mon Feb 01 2021"));
  });
});
