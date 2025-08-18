import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

// Initial render
test("renders TodoList component", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
});

// Add new todo
test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add a new todo");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Task")).toBeInTheDocument();
});

// Toggle todo
test("toggles todo completion", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");

  expect(todo).toHaveStyle("text-decoration: none");

  fireEvent.click(todo);

  expect(todo).toHaveStyle("text-decoration: line-through");
});

// Delete todo
test("deletes a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  const deleteButton = screen.getByText("Delete");

  fireEvent.click(deleteButton);

  expect(screen.queryByText("Learn React")).toBeNull();
});


