import {FormEvent, useEffect, useState} from "react";
import {Todo, TodoDto} from "./interfaces/Todo";
import {createTodo, getAllTodos} from "./services/TodoService";
import TodoForm from "./components/TodoForm";
import {TodoList} from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formData, setFormData] = useState<TodoDto>({
    text: "",
    completed: false,
    createdDate: 0,
    completedDate: 0
  });

  const getAndSetTodos = async () => {
    const todos = await getAllTodos();
    setTodos(todos || []);
  };

  const formOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createTodo(formData);
    await getAndSetTodos();
  };

  useEffect(() => {
    getAndSetTodos();
  }, []);

  return (
      <div className="App">
        <header className="m-4 p-4 text-center">
          <a href="/">
            <img
                src="logo.png"
                alt="MOROSYSTEMS"
                width="156"
                height="14"
                className="logo"
            />
          </a>
        </header>
        <div className="grid m-4 gap-y-3">
          <TodoForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={formOnSubmit}
          />

          <TodoList todos={todos} getAndSetTodos={getAndSetTodos} />
        </div>
      </div>
  );
}
