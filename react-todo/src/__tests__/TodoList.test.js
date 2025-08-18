// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import TodoList from "../components/TodoList";

// test("renders initial todos", () => {
//   render(<TodoList />);
//   expect(screen.getByText("Learn React")).toBeInTheDocument();
//   expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
// });

// test("adds a new todo", () => {
//   render(<TodoList />);
//   const input = screen.getByPlaceholderText("Add a new todo");
//   const addButton = screen.getByText("Add");
//   fireEvent.change(input, { target: { value: "New Task" } });
//   fireEvent.click(addButton);
//   expect(screen.getByText("New Task")).toBeInTheDocument();
// });

// test("toggles todo completion", () => {
//   render(<TodoList />);
//   const todo = screen.getByText("Learn React");
//   expect(todo).toHaveStyle("text-decoration: none");
//   fireEvent.click(todo);
//   expect(todo).toHaveStyle("text-decoration: line-through");
// });

// test("deletes a todo", () => {
//   render(<TodoList />);
//   const deleteButton = screen.getAllByText("Delete")[0];
//   fireEvent.click(deleteButton);
//   expect(screen.queryByText("Learn React")).toBeNull();
// });



import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

describe('TodoList Component', () => {

  // Test 1: Initial Render (No change needed here, getByText is fine for static content)
  test('renders the component with initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  // Test 2: Adding a new todo using data-testid
  test('allows users to add a new todo', () => {
    render(<TodoList />);
    
    // Find elements using their new test IDs
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Simulate user typing and clicking
    fireEvent.change(inputElement, { target: { value: 'Test with data-testid' } });
    fireEvent.click(addButton);
    
    // Assert that the new todo is now in the document
    expect(screen.getByText('Test with data-testid')).toBeInTheDocument();
  });

  // Test 3: Toggling a todo using data-testid
  test('allows users to toggle a todo', () => {
    render(<TodoList />);
    
    // We target the initial todo with id=1
    const todoText = screen.getByTestId('todo-text-1');
    
    // Check initial style
    expect(todoText.parentElement).not.toHaveStyle('text-decoration: line-through');
    
    // Click the text span to toggle
    fireEvent.click(todoText);
    
    // Assert the parent `li` now has the style
    expect(todoText.parentElement).toHaveStyle('text-decoration: line-through');
    
    // Click it again to toggle back
    fireEvent.click(todoText);

    // Assert the style is removed
    expect(todoText.parentElement).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a todo using data-testid
  test('allows users to delete a todo', () => {
    render(<TodoList />);
    
    // We will delete the todo with id=2 ("Build a project")
    const todoItemToDelete = screen.getByTestId('todo-item-2');
    expect(todoItemToDelete).toBeInTheDocument();
    
    // Find the delete button specifically for this todo item
    const deleteButton = screen.getByTestId('delete-button-2');
    fireEvent.click(deleteButton);
    
    // Assert that the entire todo item is no longer in the DOM
    expect(screen.queryByTestId('todo-item-2')).not.toBeInTheDocument();
  });
});