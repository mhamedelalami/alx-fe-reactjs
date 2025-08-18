import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "../components/TodoList"; // adjust path if needed

describe("TodoList Component Tests", () => {
  // Test 1: Initial Render
  test("should render initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
  });

  // Test 2: Adding Todos
  test("should add a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  // Test 3: Toggling Todos
  test("should toggle a todo between completed and not completed", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");

    // Initially not completed
    expect(todo).toHaveStyle("text-decoration: none");

    // Toggle completion
    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: line-through");

    // Toggle back
    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: none");
  });

  // Test 4: Deleting Todos
  test("should delete a todo", () => {
    render(<TodoList />);
    const deleteButton = screen.getAllByText("Delete")[0]; // first delete button
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Learn React")).toBeNull();
  });
});
