import React from "react";
import { toggleComplete, deleteTodo } from "./../redux/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handeCompleteClick = () => {
    dispatch(toggleComplete({ id: id, completed: !completed }));
  };

  const handleDeleteClick = () => {
	dispatch(deleteTodo({id:id}))
  }

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={() => {
              handeCompleteClick();
            }}
          ></input>
          {title}
        </span>
        <button className="btn btn-danger" onClick={()=>handleDeleteClick()}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
