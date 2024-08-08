import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// import { FaEdit } from "react-icons/fa";

function Todo() {
  let [todos, setTodos] = useState([]);
  let [todo, setTodo] = useState("");
  let [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(window.localStorage.getItem("todos"));
    console.log("Loaded todos from local storage:", savedTodos);
    if (savedTodos !== null) setTodos(savedTodos);
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    console.log("Saving todos to local storage:", todos);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let handleChange = function (e) {
    setTodo(e.target.value);
  };
  let handleAdd = function () {
    // console.log("added");
    if (todo.length === 0) return;

    if (editingId) {
      setTodos(
        todos.map((task) =>
          task.id === editingId ? { ...task, todo: todo } : task
        )
      );
      setEditingId(null);
    } else {
      setTodos([...todos, { todo: todo, id: uuidv4(), isDone: false }]);
    }

    setTodo("");
  };

  let handleDelete = function (id) {
    setTodos(todos.filter((task) => task.id !== id));
  };
  let handleDone = function (id) {
    setTodos(
      todos.map((task) => {
        return (task.id === id ? { ...task, isDone: !task.isDone } : task);
      })
       
    );
  };

  let handleEdit = function(task){
      setTodo(task.todo);
      setEditingId(task.id);
  }

  return (
    <div className="p-10  max-w-4xl m-auto">
      <div className="font-bold text-xl mb-4 tracking-wider text-center text">
        My Tasks
      </div>
      <div className="bg-zinc-200 p-5 rounded-lg">
        <div className="flex justify-between items-center  flex-wrap">
          <input
            className="outline-none border-2 w-2/3 p-1 rounded-md "
            type="text"
            placeholder="Enter your task"
            onChange={handleChange}
            value={todo}
          />
          <div
            className="bg-blue-500 m-2 p-2 rounded-md text-sm hover:cursor-pointer text-zinc-100"
            onClick={() => handleAdd()}
          >
           {editingId ? "Update Task" : "Add Task"}
          </div>
        </div>
        <div>
          {todos.map((task, index) => (
            <div className="flex items-center justify-between m-1 " key={index}>
              <div className="flex">
                {!task.isDone && (
                  <input
                    type="checkbox"
                    name=""
                    onClick={() => {
                      handleDone(task.id);
                    }}
                    id=""
                  />
                )}
                {task.isDone && (
                  <input
                    type="checkbox"
                    checked={true}
                    name=""
                    onClick={() => {
                      handleDone(task.id);
                    }}
                    id=""
                  />
                )}

                <div
                  className={`text-zinc-900 p-2 ${
                    task.isDone ? "line-through" : ""
                  }`}
                >
                  {task.todo}
                </div>
              </div>
              <div className="flex gap-2 items-center"> 

              <div className="text-xs bg-green-400 p-1 rounded-md cursor-pointer" onClick={()=>{handleEdit(task)}}>Edit</div>
              <div
                className="bg-red-500 text-zinc-100 text-xs p-2 rounded-lg cursor-pointer"
                onClick={() => {
                  handleDelete(task.id);
                }}
                >
                Delete
              </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
