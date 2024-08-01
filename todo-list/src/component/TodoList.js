import { useState, useMemo, useContext } from "react";
import "./TodoEditor.css";
import TodoItem from "./TodoItem";
import { TodoStateContext } from "../App.js";

export default function TodoList() {
  const { todo = [] } = useContext(TodoStateContext);

  const analyzeTodo = () => {
    console.log("Analyzing Todo...");
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  };

  // useMemo를 사용하지 않을 경우 search가 바뀔 때마다 계산된 값은 바뀌지 않음에도 analyzeTodo()가 재실행된다.
  const value = useMemo(() => {
    return analyzeTodo();
  }, [todo]);

  const { totalCount, doneCount, notDoneCount } = value;

  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSeachResult = () => {
    return search === ""
      ? todo
      : todo.filter((it) =>
          it.content.toLowerCase().includes(search.toLowerCase())
        );
  };

  return (
    <div className="todo-list">
      <h4>Todo List 📜</h4>
      <div className="todo-list">
        <div>총 개수 : {totalCount}</div>
        <div>완료된 할 일 : {doneCount}</div>
        <div>아직 완료되지 못한 할 일 : {notDoneCount}</div>
      </div>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력하세요"
      />
      <div className="list-wrapper">
        {getSeachResult().map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
}
