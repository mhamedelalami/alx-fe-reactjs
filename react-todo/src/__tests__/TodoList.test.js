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


describe('TodoList Component', () => {

  // Test 1: Initial Render
  test('renders the component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the main heading is there
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if our initial todos from the component's state are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a project')).toBeInTheDocument();
    expect(screen.getByText('Deploy the project')).toBeInTheDocument();
  });

  // Test 2: Adding a new todo
  test('allows users to add a new todo', () => {
    render(<TodoList />);
    
    // Find the input field by its placeholder text
    const inputElement = screen.getByPlaceholderText('Add a new todo');
    // Find the submit button
    const addButton = screen.getByRole('button', { name: /add todo/i });
    
    // Simulate user typing "Read a book" into the input field
    fireEvent.change(inputElement, { target: { value: 'Read a book' } });
    // Simulate clicking the "Add Todo" button
    fireEvent.click(addButton);
    
    // Assert that the new todo item is now present in the document
    expect(screen.getByText('Read a book')).toBeInTheDocument();
  });

  // Test 3: Toggling a todo's completion status
  test('allows users to toggle a todo', () => {
    render(<TodoList />);
    
    // Find the "Learn React" todo item
    const todoItem = screen.getByText('Learn React');
    
    // Initially, it should not have the line-through style
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    
    // Simulate clicking the todo item to mark it as complete
    fireEvent.click(todoItem);
    
    // Assert that the style has been applied
    expect(todoItem).toHaveStyle('text-decoration: line-through');
    
    // Simulate clicking it again to toggle back
    fireEvent.click(todoItem);

    // Assert that the style has been removed
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a todo
  test('allows users to delete a todo', () => {
    render(<TodoList />);
    
    // Find the todo we want to delete
    const todoTextToDelete = 'Build a project';
    const todoItem = screen.getByText(todoTextToDelete);
    
    // Make sure it's in the document to begin with
    expect(todoItem).toBeInTheDocument();
    
    // Find the delete button associated with this specific todo.
    // We find its parent `li` element and then query for the button within it.
    const deleteButton = todoItem.nextSibling; // The button is the next element
    fireEvent.click(deleteButton);
    
    // Now, we expect the todo item to be gone.
    // We use queryByText because it returns null if not found (doesn't throw an error).
    expect(screen.queryByText(todoTextToDelete)).not.toBeInTheDocument();
  });
});