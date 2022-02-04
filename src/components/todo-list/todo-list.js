import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ onDelete, onToggleImportant, onToggleDone, todos }) => {
  const elements = todos.map((item) => {
    return (
      <li key={item.id} className="list-group-item">
        <TodoListItem onToggleImportant={onToggleImportant} onDelete={onDelete} onToggleDone={onToggleDone} {...item } />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
