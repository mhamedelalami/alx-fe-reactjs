import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList"; // adjust path if needed

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add a new todo");
  const addButton = screen.getByText("Add");
  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(addButton);
  expect(screen.getByText("New Task")).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  // Initially not completed
  expect(todo).toHaveStyle("text-decoration: none");
  fireEvent.click(todo);
  // After click, should be line-through
  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const deleteButton = screen.getAllByText("Delete")[0]; // first delete button
  fireEvent.click(deleteButton);
  expect(screen.queryByText("Learn React")).toBeNull();
});
