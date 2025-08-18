// src/components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-item" data-testid="todo-item">
      <div
        className="todo-content"
        onClick={() => onToggle(todo.id)}
        data-testid="todo-toggle"
        style={{ cursor: 'pointer' }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          data-testid="todo-checkbox"
        />
        <span
          className={todo.completed ? 'completed' : ''}
          data-testid="todo-text"
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            marginLeft: '8px'
          }}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        data-testid="delete-button"
        style={{
          marginLeft: '10px',
          backgroundColor: '#ff4757',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;