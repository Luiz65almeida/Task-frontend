import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task)}
        />
        {task.done ? <s>{task.description}</s> : task.description}
      </label>
      <button
        onClick={() => onDelete(task)}
        className="delete-btn"
        title="Excluir"
      >
        🗑
      </button>
    </li>
  );
}