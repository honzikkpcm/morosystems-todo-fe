import { useState } from "react";
import { Todo } from "../interfaces/Todo";
import {completeTodo, deleteTodo, updateTodoStatus} from "../services/TodoService";
import TodoItem from "./TodoItem";

export function TodoList(props: {
  todos: Todo[];
  getAndSetTodos: () => Promise<void>;
}) {
  const { todos, getAndSetTodos } = props;

  const [showOpenTodos, setShowOpenTodos] = useState(true);
  const [showClosedTodos, setShowClosedTodos] = useState(false);

  const deleteOnClick = async (id: string) => {
    await deleteTodo(id);
    await getAndSetTodos();
  };

  const completeAllOnClick = async () => {
    todos.forEach((item, index)=>{
      if(!item.completed) {
        completeTodo(item.id);
      }
    })
    await getAndSetTodos();
  };

  const updateAndSetTodo = async (id: string, data: Todo) => {
    await updateTodoStatus(id, data);
    await getAndSetTodos();
  };

  const filterTodos = (todos: Todo[]) => {
    return todos.filter((todo) => {
      if (showOpenTodos && showClosedTodos) {
        return true;
      } else if (showOpenTodos) {
        return !todo.completed;
      } else if (showClosedTodos) {
        return todo.completed;
      } else {
        return false;
      }
    });
  };


  const generateTodoListElements = (todos: Todo[]) => {
    return todos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateAndSetTodo={updateAndSetTodo}
          deleteOnClick={deleteOnClick}
          getAndSetTodos={getAndSetTodos}
        />
      );
    });
  };

  return (
    <div className="container border rounded-xl p-4 shadow-lg">
      <header className="grid grid-cols-2 m-4 gap-x-4 text-2xl font-semibold">
        <div className="container space-x-4 my-2">
          <label className="inline-flex relative items-center cursor-pointer">
            <input
                type="checkbox"
                onClick={() => setShowOpenTodos(!showOpenTodos)}
                defaultChecked={showOpenTodos}
                className="sr-only peer"
            />
            <div
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Nedokončené
          </span>
          </label>
        </div>
        <div className="container space-x-4 my-2 justify-end">
          <label className="inline-flex relative items-center cursor-pointer">
            <input
                type="checkbox"
                onClick={() => setShowClosedTodos(!showClosedTodos)}
                defaultChecked={showClosedTodos}
                className="sr-only peer"
            />
            <div
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Dokončené
          </span>
          </label>
        </div>
      </header>

      <ul className="TodoList container divide-y mb-3">
        {generateTodoListElements(filterTodos(todos))}
      </ul>

      <footer className="{container flex flex-col items-center}">
        <button
            className="rounded-md m-2 p-2 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white"
            onClick={() => completeAllOnClick()}>
          Označit vše za hotové
        </button>

      </footer>
    </div>
  );
}
