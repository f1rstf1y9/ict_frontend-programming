import React, { useContext } from "react";
import "./TodoItem.css";
import { TodoDispatchContext } from "../App";

function TodoItem({ id, content, isDone, createDate }) {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  return (
    <div className="todo-item">
      <div className="checkbox_col">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => onUpdate(id)}
          checked={isDone}
        />
      </div>
      <div className="title_col">{content}</div>
      <div className="date_col">
        {new Date(createDate).toLocaleDateString()}
      </div>
      <div className="btn_col">
        <button onClick={() => onDelete(id)}>삭제</button>
      </div>
    </div>
  );
}

export default React.memo(TodoItem);
