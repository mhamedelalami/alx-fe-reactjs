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
import App from '../App';

// Mock the lucide-react icons to avoid import issues in tests
jest.mock('lucide-react', () => ({
  Trash2: () => <div data-testid="trash-icon">Trash</div>,
  Plus: () => <div data-testid="plus-icon">Plus</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
  X: () => <div data-testid="x-icon">X</div>,
}));

describe('TodoList Component', () => {
  beforeEach(() => {
    render(<App />);
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

    test('displays task counters', () => {
      expect(screen.getByTestId('remaining-count')).toHaveTextContent('2 remaining');
      expect(screen.getByTestId('completed-count')).toHaveTextContent('1 completed');
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

    test('adds todo when Enter key is pressed', async () => {
      const input = screen.getByTestId('todo-input');
      
      fireEvent.change(input, { target: { value: 'Enter key todo' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      
      await waitFor(() => {
        expect(screen.getByText('Enter key todo')).toBeInTheDocument();
      });
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

    test('does not add todos with only whitespace', () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      const initialTodoCount = screen.getAllByTestId('todo-item').length;
      
      // Try to add whitespace only
      fireEvent.change(input, { target: { value: '   ' } });
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

    test('updates stats after adding todo', async () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      fireEvent.change(input, { target: { value: 'Stats test todo' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        const statsElement = screen.getByTestId('todo-stats');
        expect(statsElement).toHaveTextContent('1 of 4 tasks completed');
      });
    });
  });

  // Test 3: Toggling Todos
  describe('Toggling Todos', () => {
    test('toggles todo completion status when clicked', () => {
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      
      // Initially should not be completed
      expect(learnReactTodo.querySelector('[data-testid="todo-text"]')).not.toHaveClass('line-through');
      
      fireEvent.click(toggleElement);
      
      // Should now be completed
      expect(learnReactTodo.querySelector('[data-testid="todo-text"]')).toHaveClass('line-through');
    });

    test('toggles completed todo back to incomplete', () => {
      const buildAppTodo = screen.getByText('Build a todo app').closest('[data-testid="todo-item"]');
      const toggleElement = buildAppTodo.querySelector('[data-testid="todo-toggle"]');
      
      // Initially should be completed (line-through)
      expect(buildAppTodo.querySelector('[data-testid="todo-text"]')).toHaveClass('line-through');
      
      fireEvent.click(toggleElement);
      
      // Should now be incomplete
      expect(buildAppTodo.querySelector('[data-testid="todo-text"]')).not.toHaveClass('line-through');
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

    test('updates remaining count when toggling todos', () => {
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      
      // Initially 2 remaining
      expect(screen.getByTestId('remaining-count')).toHaveTextContent('2 remaining');
      
      fireEvent.click(toggleElement);
      
      // Should now be 1 remaining
      expect(screen.getByTestId('remaining-count')).toHaveTextContent('1 remaining');
    });

    test('updates stats when toggling todos', () => {
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      
      fireEvent.click(toggleElement);
      
      const statsElement = screen.getByTestId('todo-stats');
      expect(statsElement).toHaveTextContent('2 of 3 tasks completed');
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
        const deleteButton = screen.getAllByTestId('delete-button')[0]; // Always get the first one
        fireEvent.click(deleteButton);
      }
      
      await waitFor(() => {
        expect(screen.getByTestId('empty-message')).toBeInTheDocument();
        expect(screen.getByTestId('empty-message')).toHaveTextContent('No todos yet. Add one above!');
      });
    });

    test('hides counters when all todos are deleted', async () => {
      const todoItems = screen.getAllByTestId('todo-item');
      
      // Delete all todos
      for (let i = 0; i < todoItems.length; i++) {
        const deleteButton = screen.getAllByTestId('delete-button')[0];
        fireEvent.click(deleteButton);
      }
      
      await waitFor(() => {
        expect(screen.queryByTestId('remaining-count')).not.toBeInTheDocument();
        expect(screen.queryByTestId('completed-count')).not.toBeInTheDocument();
      });
    });
  });

  // Test 5: Edge Cases and Integration
  describe('Edge Cases and Integration', () => {
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

    test('handles toggling and then deleting a todo', async () => {
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      const deleteButton = learnReactTodo.querySelector('[data-testid="delete-button"]');
      
      // Toggle first
      fireEvent.click(toggleElement);
      expect(learnReactTodo.querySelector('[data-testid="todo-text"]')).toHaveClass('line-through');
      
      // Then delete
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      });
    });

    test('maintains correct state after multiple operations', async () => {
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      // Add two todos
      fireEvent.change(input, { target: { value: 'First new todo' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('First new todo')).toBeInTheDocument();
      });
      
      fireEvent.change(input, { target: { value: 'Second new todo' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Second new todo')).toBeInTheDocument();
      });
      
      // Toggle one of the original todos
      const learnReactTodo = screen.getByText('Learn React').closest('[data-testid="todo-item"]');
      const toggleElement = learnReactTodo.querySelector('[data-testid="todo-toggle"]');
      fireEvent.click(toggleElement);
      
      // Delete one of the new todos
      const firstNewTodo = screen.getByText('First new todo').closest('[data-testid="todo-item"]');
      const deleteButton = firstNewTodo.querySelector('[data-testid="delete-button"]');
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        // Check final state
        expect(screen.queryByText('First new todo')).not.toBeInTheDocument();
        expect(screen.getByText('Second new todo')).toBeInTheDocument();
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(learnReactTodo.querySelector('[data-testid="todo-text"]')).toHaveClass('line-through');
        
        // Check stats
        const statsElement = screen.getByTestId('todo-stats');
        expect(statsElement).toHaveTextContent('2 of 4 tasks completed');
      });
    });
  });
});