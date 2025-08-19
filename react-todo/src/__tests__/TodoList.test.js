// src/__tests__/TodoList.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // Test initial render
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a project")).toBeInTheDocument();
    expect(screen.getByText("Deploy the project")).toBeInTheDocument();
  });

  // Test adding a todo
  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add Todo");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  // Test toggling a todo
  test("toggles todo completion", () => {
    render(<TodoList />);
    const todoText = screen.getByText("Learn React");
    expect(todoText).toHaveStyle("text-decoration: none");
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle("text-decoration: line-through");
  });

  // Test deleting a todo
  test("deletes a todo", () => {
    render(<TodoList />);
    const deleteButton = screen.getByTestId(/delete-button-1/i);
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Learn React")).toBeNull();
  });
});
