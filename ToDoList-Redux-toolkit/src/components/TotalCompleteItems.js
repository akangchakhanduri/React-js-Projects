import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const CompletedTodos = useSelector((state) =>
    state.todos.filter((todo) => todo.completed === true)
  );
  return (
    <h4 className="mt-3">Total Complete Items: {CompletedTodos.length}</h4>
  );
};

export default TotalCompleteItems;
