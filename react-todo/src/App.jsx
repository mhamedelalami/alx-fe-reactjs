// import React from "react";
// import TodoList from "./components/TodoList";

// function App() {
//   return (
//     <div>
//       <h1>My Todo App</h1>
//       <TodoList />
//     </div>
//   );
// }

// export default App;


// src/App.js
import React, { useState } from 'react';
import './App.css';

// AddTodoForm Component
const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-button">
        Add Todo
      </button>
    </form>
  );
};

// TodoList Component
const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write unit tests', completed: false },
    { id: 3, text: 'Build a todo app', completed: true },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            data-testid="todo-item"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className="todo-text"
              data-testid="todo-text"
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
              data-testid="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p data-testid="empty-message">No todos available</p>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;