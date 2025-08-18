import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList"; // adjust path if needed

// Test initial render
test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
});

// Test adding todos
test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add a new todo");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Task")).toBeInTheDocument();
});

// Test toggling todos
test("toggles todo completion", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");

  // Initially not completed
  expect(todo).toHaveStyle("text-decoration: none");

  fireEvent.click(todo);

  // After click, completed
  expect(todo).toHaveStyle("text-decoration: line-through");
});

// Test deleting todos
test("deletes a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  const deleteButton = todo.parentElement.querySelector("button"); // get corresponding delete button

  fireEvent.click(deleteButton);

  expect(screen.queryByText("Learn React")).toBeNull();
});
