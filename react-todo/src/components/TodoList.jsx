import React, { useState } from 'react';

// This is our main component
function TodoList() {
  // 'todos' is the state variable holding our array of todo items.
  // 'setTodos' is the function we use to update this state.
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy the project', completed: true },
  ]);

  // 'inputValue' holds the text of the new todo being typed by the user.
  const [inputValue, setInputValue] = useState('');

  // Handles adding a new todo
  const addTodo = (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    if (!inputValue.trim()) return; // Don't add empty todos

    const newTodo = {
      id: Date.now(), // A simple way to generate a unique ID
      text: inputValue,
      completed: false,
    };
    // We create a new array with the old todos plus the new one
    setTodos([...todos, newTodo]);
    setInputValue(''); // Clear the input field after adding
  };

  // Handles toggling the 'completed' status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handles deleting a todo from the list
  const deleteTodo = (id) => {
    // We create a new array that excludes the todo with the matching id
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* Form for adding new todos */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* List of todos */}
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer' // Shows the user it's clickable
            }}
          >
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>
            {/* We stop propagation so clicking delete doesn't also toggle */}
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;