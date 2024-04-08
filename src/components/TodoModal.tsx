import React, { SetStateAction, useState } from "react";
import { Todo } from "../interfaces/Todo";
import { updateTodo } from "../services/TodoService";

export default function TodoModal(props: {
  todo: Todo;
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  getAndSetTodos: () => Promise<void>;
}) {
  const { todo, showModal, setShowModal, getAndSetTodos } = props;

  const [todoData, setTodoData] = useState(todo);
  const [dataChanged, setDataChanged] = useState(false);

  const closedTag = (status: boolean) => {
    if (todo.completed)
      return <div className="text-indigo-600 font-semibold">Closed</div>;
  };

  const handleChange = () => {
    if (
      todoData.text !== todo.text
    ) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  };

  const handleSubmit = async () => {
    await updateTodo(todo.id, { ...todoData });
    await getAndSetTodos();
  };

  return (
    <div>
      {showModal ? (
        <div
          onClick={() => {
            setShowModal(false);
          }}
          className="fixed bg-zinc-700/50 inset-0 z-50"
        >
          <div className="flex justify-center items-center h-screen">
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="container p-12 mx-20 my-10 bg-white border rounded-xl"
            >
              {closedTag(todo.completed)}
              <div className="flex justify-between">
                <div className="flex justify-between align-middle grow space-x-4 mb-4">
                  <input
                    className="text-3xl grow font-semibold focus:outline-none"
                    name="title"
                    value={todoData.text}
                    onKeyUp={handleChange}
                    onChange={(e) => {
                      setTodoData({
                        ...todoData,
                        text: e.target.value,
                      });
                    }}
                  />
                </div>
                <button onClick={() => setShowModal(false)}>x</button>
              </div>
              <div className="flex space-x-4">
                <button
                  className="border text-slate-500 rounded-xl px-5 py-1 disabled:text-slate-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setTodoData(todo);
                    setDataChanged(false);
                  }}
                  disabled={!dataChanged}
                >
                  Reset
                </button>
                <button
                  className="bg-indigo-600 text-white rounded-xl px-5 py-1 disabled:opacity-50"
                  type="submit"
                  disabled={!dataChanged}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
