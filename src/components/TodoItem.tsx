import { useState } from "react";
import { Todo } from "../interfaces/Todo";
import TodoModal from "./TodoModal";

export default function TodoItem(props: {
  todo: Todo;
  updateAndSetTodo: (id: string, data: Todo) => Promise<void>;
  deleteOnClick: (id: string) => Promise<void>;
  getAndSetTodos: () => Promise<void>;
}) {
  const { todo, updateAndSetTodo, deleteOnClick, getAndSetTodos } = props;

  const [showModal, setShowModal] = useState(false);

  const statusColor =
    !todo.completed
      ? "bg-white ring-slate-200 hover:ring-indigo-600"
      : "bg-indigo-600 ring-indigo-600 hover:bg-white";

  return (
    <li key={todo.id} className="TodoItem p-2 hover:bg-slate-50 ">
      <TodoModal
        todo={todo}
        showModal={showModal}
        setShowModal={setShowModal}
        getAndSetTodos={getAndSetTodos}
      />
      <div className="flex justify-between transition ease-in-out duration-100">
        <div className="flex">
          <div
            className={`h-5 w-5 mt-0.5 mr-3 ring-2 rounded-full hover:cursor-pointer transition duration-100 ${statusColor}`}
            onClick={() => updateAndSetTodo(todo.id, todo)}
          ></div>
          <div onClick={() => setShowModal(true)} className={"cursor-pointer"}>
            <div className="font-medium">{todo.text}</div>
          </div>
        </div>
        <div>
          <button
              className={`h-5 w-5 mt-0.5 mr-3 ring-2 rounded-full hover:cursor-pointer transition duration-100 text-white bg-red-600 ring-red-600 hover:bg-white hover:text-black`}
              onClick={() => deleteOnClick(todo.id)}
              title="Smazat úkol"
          ></button>
        </div>
      </div>
    </li>
  );
}
