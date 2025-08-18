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
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  // Test 1: Initial Render
  describe('Initial Render', () => {
    test('renders TodoList component correctly', () => {
      expect(screen.getByTestId('app-title')).toBeInTheDocument();
      expect(screen.getByTestId('app-title')).toHaveTextContent('Todo List');
    });

    test('displays initial todos', () => {
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(3);
      
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Write unit tests')).toBeInTheDocument();
      expect(screen.getByText('Build a todo app')).toBeInTheDocument();
    });

    test('displays correct initial stats', () => {
      const statsElement = screen.getByTestId('todo-stats');
      expect(statsElement).toHaveTextContent('1 of 3 tasks completed');
    });

    test('renders add todo form', () => {
      expect(screen.getByTestId('todo-input')).toBeInTheDocument();
      expect(screen.getByTestId('add-button')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    });
  });

  // Test 2: Adding Todos
  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', async () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      fireEvent.change(input, { target: { value: 'New test todo' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('New test todo')).toBeInTheDocument();
      });
      
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(4);
    });

    test('clears input after adding todo', async () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      fireEvent.change(input, { target: { value: 'Clear input test' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });

    test('does not add empty todos', () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      const initialTodoCount = screen.getAllByTestId('todo-item').length;
      
      // Try to add empty string
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.click(addButton);
      
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(initialTodoCount);
    });

    test('trims whitespace from new todos', async () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      fireEvent.change(input, { target: { value: '  Trimmed todo  ' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Trimmed todo')).toBeInTheDocument();
      });
    });
  });

  // Test 3: Toggling Todos
  describe('Toggling Todos', () => {
    test('toggles todo completion status when clicked', () => {
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      
      // Initially should not be completed
      expect(learnReactTodo.querySelector('[data-testid="todo-text"]')).not.toHaveStyle('text-decoration: line-through');
      
      fireEvent.click(toggleElement);
      
      // Should now be completed
      expect(learnReactTodo.querySelector('[data-testid="todo-text"]')).toHaveStyle('text-decoration: line-through');
    });

    test('checkbox reflects completion status', () => {
      const buildAppTodo = screen.getByText('Build a todo app').closest('[data-testid="todo-item"]');
      const checkbox = buildAppTodo.querySelector('[data-testid="todo-checkbox"]');
      
      // Initially should be checked (completed)
      expect(checkbox).toBeChecked();
      
      fireEvent.click(checkbox);
      
      // Should now be unchecked
      expect(checkbox).not.toBeChecked();
    });

    test('updates completed count when toggling todos', () => {
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      
      // Initially 1 completed
      expect(screen.getByTestId('completed-count')).toHaveTextContent('1 completed');
      
      fireEvent.click(toggleElement);
      
      // Should now be 2 completed
      expect(screen.getByTestId('completed-count')).toHaveTextContent('2 completed');
    });
  });

  // Test 4: Deleting Todos
  describe('Deleting Todos', () => {
    test('deletes a todo when delete button is clicked', async () => {
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const deleteButton = learnReactTodo.querySelector('[data-testid="delete-button"]');
      
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      });
      
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(2);
    });

    test('updates stats after deleting todo', async () => {
      const buildAppTodo = screen.getByText('Build a todo app').closest('[data-testid="todo-item"]');
      const deleteButton = buildAppTodo.querySelector('[data-testid="delete-button"]');
      
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        const statsElement = screen.getByTestId('todo-stats');
        expect(statsElement).toHaveTextContent('0 of 2 tasks completed');
      });
    });

    test('shows empty message when all todos are deleted', async () => {
      const todoItems = screen.getAllByTestId('todo-item');
      
      // Delete all todos
      for (let i = 0; i < todoItems.length; i++) {
        const deleteButton = screen.getAllByTestId('delete-button')[0];
        fireEvent.click(deleteButton);
      }
      
      await waitFor(() => {
        expect(screen.getByTestId('empty-message')).toBeInTheDocument();
        expect(screen.getByTestId('empty-message')).toHaveTextContent('No todos yet. Add one above!');
      });
    });
  });

  // Test 5: Integration Tests
  describe('Integration Tests', () => {
    test('handles adding and immediately deleting a todo', async () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Add a todo
      fireEvent.change(input, { target: { value: 'Temporary todo' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Temporary todo')).toBeInTheDocument();
      });
      
      // Delete it immediately
      const tempTodo = screen.getByText('Temporary todo').closest('[data-testid="todo-item"]');
      const deleteButton = tempTodo.querySelector('[data-testid="delete-button"]');
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Temporary todo')).not.toBeInTheDocument();
      });
    });

    test('maintains correct state after multiple operations', async () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Add a todo
      fireEvent.change(input, { target: { value: 'New todo' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('New todo')).toBeInTheDocument();
      });
      
      // Toggle an existing todo
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      fireEvent.click(toggleElement);
      
      // Verify final state
      expect(screen.getByText('New todo')).toBeInTheDocument();
      expect(learnReactTodo.querySelector('[data-testid="todo-text"]')).toHaveStyle('text-decoration: line-through');
      
      const statsElement = screen.getByTestId('todo-stats');
      expect(statsElement).toHaveTextContent('2 of 4 tasks completed');
    });
  });
});