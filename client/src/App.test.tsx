import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders the initial app state successfully', () => {
  render(<App/>)

  expect(screen.getByText(/task tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/no tasks have been added yet./i)).toBeInTheDocument();
  expect(screen.getByText(/add task/i)).toBeInTheDocument();
});
