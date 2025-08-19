import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a project")).toBeInTheDocument();
    expect(screen.getByText("Deploy the project")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);
    
    const todoText = screen.getByText("Learn React");
    const todoItem = todoText.closest("li"); // select the <li> which has the style

    // initially not completed
    expect(todoItem).toHaveStyle("text-decoration: none");

    // toggle completion
    fireEvent.click(todoText);
    expect(todoItem).toHaveStyle("text-decoration: line-through");

    // toggle back
    fireEvent.click(todoText);
    expect(todoItem).toHaveStyle("text-decoration: none");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    
    const todoText = screen.getByText("Learn React");
    const deleteButton = screen.getByTestId(`delete-button-1`); // use id 1

    fireEvent.click(deleteButton);

    expect(screen.queryByText("Learn React")).toBeNull();
  });
});
