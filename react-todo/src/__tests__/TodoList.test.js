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

// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import TodoList from "../components/TodoList"; // path to your component

// // ✅ Test initial render
// test("renders initial todos", () => {
//   render(<TodoList />);
//   expect(screen.getByText("Learn React")).toBeInTheDocument();
//   expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
// });

// // ✅ Test adding todos
// test("adds a new todo", () => {
//   render(<TodoList />);
//   const input = screen.getByPlaceholderText("Add a new todo");
//   const addButton = screen.getByText("Add");

//   fireEvent.change(input, { target: { value: "New Task" } });
//   fireEvent.click(addButton);

//   expect(screen.getByText("New Task")).toBeInTheDocument();
// });

// // ✅ Test toggling todos
// test("toggles todo completion", () => {
//   render(<TodoList />);
//   const todo = screen.getByText("Learn React");

//   // Initially not completed
//   expect(todo).toHaveStyle("text-decoration: none");

//   fireEvent.click(todo);

//   // Now completed
//   expect(todo).toHaveStyle("text-decoration: line-through");
// });

// // ✅ Test deleting todos
// test("deletes a todo", () => {
//   render(<TodoList />);
//   const deleteButton = screen.getAllByText("Delete")[0]; // first delete button
//   fireEvent.click(deleteButton);

//   // The deleted todo should no longer be in the document
//   expect(screen.queryByText("Learn React")).toBeNull();
// });




// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('TodoList Component Tests', () => {
  
  // Test 1: Initial Render Test
  describe('Initial Render', () => {
    test('renders TodoList component correctly', () => {
      render(<App />);
      
      // Check if the main heading is present
      expect(screen.getByText('Todo List')).toBeInTheDocument();
      
      // Check if initial todos are rendered
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Write unit tests')).toBeInTheDocument();
      expect(screen.getByText('Build a todo app')).toBeInTheDocument();
      
      // Check if input field is present
      expect(screen.getByTestId('todo-input')).toBeInTheDocument();
      expect(screen.getByTestId('add-button')).toBeInTheDocument();
    });

    test('displays initial state correctly', () => {
      render(<App />);
      
      // Check that we have 3 initial todos
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(3);
      
      // Check that "Build a todo app" is marked as completed (line-through)
      const completedTodo = screen.getByText('Build a todo app');
      expect(completedTodo).toHaveStyle('text-decoration: line-through');
    });
  });

  // Test 2: Adding Todos Test
  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', () => {
      render(<App />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Add new todo
      fireEvent.change(input, { target: { value: 'New test todo' } });
      fireEvent.click(addButton);
      
      // Check if new todo appears
      expect(screen.getByText('New test todo')).toBeInTheDocument();
      
      // Check if we now have 4 todos
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(4);
      
      // Check if input is cleared
      expect(input.value).toBe('');
    });

    test('does not add empty todos', () => {
      render(<App />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      const initialTodoCount = screen.getAllByTestId('todo-item').length;
      
      // Try to add empty todo
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.click(addButton);
      
      // Check that no new todo was added
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(initialTodoCount);
    });

    test('trims whitespace when adding todos', () => {
      render(<App />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Add todo with whitespace
      fireEvent.change(input, { target: { value: '  Trimmed Todo  ' } });
      fireEvent.click(addButton);
      
      // Check if todo was added with trimmed text
      expect(screen.getByText('Trimmed Todo')).toBeInTheDocument();
    });

    test('adds todo using Enter key', () => {
      render(<App />);
      
      const input = screen.getByTestId('todo-input');
      
      // Add todo using Enter key
      fireEvent.change(input, { target: { value: 'Enter key todo' } });
      fireEvent.submit(input.closest('form'));
      
      // Check if new todo appears
      expect(screen.getByText('Enter key todo')).toBeInTheDocument();
    });
  });

  // Test 3: Toggling Todos Test
  describe('Toggling Todos', () => {
    test('toggles todo completion when clicked', () => {
      render(<App />);
      
      const learnReactTodo = screen.getByText('Learn React');
      
      // Initially should not be completed (no line-through)
      expect(learnReactTodo).not.toHaveStyle('text-decoration: line-through');
      
      // Click to toggle
      fireEvent.click(learnReactTodo);
      
      // Should now be completed (line-through)
      expect(learnReactTodo).toHaveStyle('text-decoration: line-through');
    });

    test('toggles completed todo back to incomplete', () => {
      render(<App />);
      
      const buildAppTodo = screen.getByText('Build a todo app');
      
      // Initially should be completed (line-through)
      expect(buildAppTodo).toHaveStyle('text-decoration: line-through');
      
      // Click to toggle
      fireEvent.click(buildAppTodo);
      
      // Should now be incomplete (no line-through)
      expect(buildAppTodo).not.toHaveStyle('text-decoration: line-through');
    });

    test('multiple todos can be toggled independently', () => {
      render(<App />);
      
      const learnReactTodo = screen.getByText('Learn React');
      const writeTestsTodo = screen.getByText('Write unit tests');
      
      // Toggle both todos
      fireEvent.click(learnReactTodo);
      fireEvent.click(writeTestsTodo);
      
      // Both should now be completed
      expect(learnReactTodo).toHaveStyle('text-decoration: line-through');
      expect(writeTestsTodo).toHaveStyle('text-decoration: line-through');
      
      // Toggle one back
      fireEvent.click(learnReactTodo);
      
      // Only one should be completed now
      expect(learnReactTodo).not.toHaveStyle('text-decoration: line-through');
      expect(writeTestsTodo).toHaveStyle('text-decoration: line-through');
    });
  });

  // Test 4: Deleting Todos Test
  describe('Deleting Todos', () => {
    test('deletes a todo when delete button is clicked', () => {
      render(<App />);
      
      const initialTodoCount = screen.getAllByTestId('todo-item').length;
      const learnReactTodo = screen.getByText('Learn React');
      const deleteButton = learnReactTodo.parentElement.querySelector('[data-testid="delete-button"]');
      
      // Delete the todo
      fireEvent.click(deleteButton);
      
      // Check if todo is removed
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      
      // Check if todo count decreased
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(initialTodoCount - 1);
    });

    test('deletes correct todo when multiple delete buttons exist', () => {
      render(<App />);
      
      const writeTestsTodo = screen.getByText('Write unit tests');
      const deleteButton = writeTestsTodo.parentElement.querySelector('[data-testid="delete-button"]');
      
      // Delete specific todo
      fireEvent.click(deleteButton);
      
      // Check if correct todo is removed
      expect(screen.queryByText('Write unit tests')).not.toBeInTheDocument();
      
      // Check if other todos still exist
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Build a todo app')).toBeInTheDocument();
    });

    test('shows empty message when all todos are deleted', () => {
      render(<App />);
      
      // Delete all todos
      const deleteButtons = screen.getAllByTestId('delete-button');
      deleteButtons.forEach(button => {
        fireEvent.click(button);
      });
      
      // Check if empty message appears
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
      expect(screen.getByText('No todos available')).toBeInTheDocument();
    });

    test('can delete completed and incomplete todos', () => {
      render(<App />);
      
      // Delete a completed todo
      const buildAppTodo = screen.getByText('Build a todo app');
      const completedDeleteButton = buildAppTodo.parentElement.querySelector('[data-testid="delete-button"]');
      fireEvent.click(completedDeleteButton);
      
      expect(screen.queryByText('Build a todo app')).not.toBeInTheDocument();
      
      // Delete an incomplete todo
      const learnReactTodo = screen.getByText('Learn React');
      const incompleteDeleteButton = learnReactTodo.parentElement.querySelector('[data-testid="delete-button"]');
      fireEvent.click(incompleteDeleteButton);
      
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });
  });

  // Test 5: Integration Tests
  describe('Integration Tests', () => {
    test('full workflow: add, toggle, and delete todo', () => {
      render(<App />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Add new todo
      fireEvent.change(input, { target: { value: 'Integration test todo' } });
      fireEvent.click(addButton);
      
      const newTodo = screen.getByText('Integration test todo');
      expect(newTodo).toBeInTheDocument();
      expect(newTodo).not.toHaveStyle('text-decoration: line-through');
      
      // Toggle todo to completed
      fireEvent.click(newTodo);
      expect(newTodo).toHaveStyle('text-decoration: line-through');
      
      // Delete the todo
      const deleteButton = newTodo.parentElement.querySelector('[data-testid="delete-button"]');
      fireEvent.click(deleteButton);
      
      expect(screen.queryByText('Integration test todo')).not.toBeInTheDocument();
    });

    test('adding multiple todos and managing them', () => {
      render(<App />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Add multiple todos
      const todosToAdd = ['First todo', 'Second todo', 'Third todo'];
      
      todosToAdd.forEach(todoText => {
        fireEvent.change(input, { target: { value: todoText } });
        fireEvent.click(addButton);
        expect(screen.getByText(todoText)).toBeInTheDocument();
      });
      
      // Should have 6 todos total (3 initial + 3 added)
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(6);
      
      // Toggle some todos
      fireEvent.click(screen.getByText('First todo'));
      fireEvent.click(screen.getByText('Third todo'));
      
      expect(screen.getByText('First todo')).toHaveStyle('text-decoration: line-through');
      expect(screen.getByText('Second todo')).not.toHaveStyle('text-decoration: line-through');
      expect(screen.getByText('Third todo')).toHaveStyle('text-decoration: line-through');
    });

    test('edge case: rapid add and delete operations', () => {
      render(<App />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Rapidly add and delete todos
      for (let i = 0; i < 3; i++) {
        // Add todo
        fireEvent.change(input, { target: { value: `Rapid todo ${i}` } });
        fireEvent.click(addButton);
        
        const newTodo = screen.getByText(`Rapid todo ${i}`);
        expect(newTodo).toBeInTheDocument();
        
        // Immediately delete it
        const deleteButton = newTodo.parentElement.querySelector('[data-testid="delete-button"]');
        fireEvent.click(deleteButton);
        
        expect(screen.queryByText(`Rapid todo ${i}`)).not.toBeInTheDocument();
      }
      
      // Should still have original 3 todos
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(3);
    });
  });
});