import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {TasksApiContextProvider} from "./contexts/tasksContext";

test('renders the app successfully', () => {
  render(
    <TasksApiContextProvider>
      <App/>
    </TasksApiContextProvider>);
  const linkElement = screen.getByText(/task tracker/i);

  expect(linkElement).toBeInTheDocument();
});
