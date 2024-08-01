import React from "react";
import "./TodoEditor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

export default function TodoEditor() {
  const { onCreate } = useContext(TodoDispatchContext);

  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef();
  const onChangeContent = (e) => {
    setContent(e.target.value);
    if (isError) {
      setIsError(false);
    }
  };

  const onSubmit = () => {
    if (!content) {
      setIsError(true);
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="todo-editor">
      <h4>새로운 Todo 작성하기 📝</h4>
      <div className="editor-wrapper">
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder={isError ? "입력하세요" : "새로운 Todo..."}
          type="text"
          style={{ borderColor: isError ? "red" : "rgb(220, 220, 220)" }}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
}
