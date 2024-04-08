import axios from "axios";
import { Todo, TodoDto } from "../interfaces/Todo";

const apiUrl : string = "http://localhost:8080"

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(apiUrl + "/tasks")
  const status = response.status;
  console.log("DEBUG:")
  console.log("    GET STATUS:", status);
  return response.data;
}

export const getTodo = async (id: number): Promise<Todo> => {
  const response = await axios.get(apiUrl + `/tasks/${id}`);
  const status = response.status;
  console.log("DEBUG:")
  console.log("    GET STATUS:", status);
  return response.data;
}

export const createTodo = async (data: TodoDto): Promise<number> => {
  data.completed = false
  const response = await axios.post(apiUrl + "/tasks", data);
  const status = response.status;
  console.log("DEBUG:")
  console.log("    CREATE STATUS:", status);
  return status;
}

export const updateTodo = async (id: string, data: TodoDto): Promise<number> => {
  const response = await axios.post(apiUrl + `/tasks/${id}`, data);
  const status = response.status;
  console.log("DEBUG:")
  console.log("    UPDATE STATUS:", status);
  return status;
}

export const updateTodoStatus = async (id: string, data: TodoDto): Promise<number> => {
  let apiUrlComplete = "complete";
  if(data.completed) { apiUrlComplete = "incomplete" }
  const response = await axios.post(apiUrl + `/tasks/${id}/` + apiUrlComplete, data).catch();
  const status = response.status;
  console.log("DEBUG:")
  console.log("    UPDATE STATUS:", status);
  return status;
}

export const completeTodo = async (id: string): Promise<number> => {
  const response = await axios.post(apiUrl + `/tasks/${id}/complete`);
  const status = response.status;
  console.log("DEBUG:")
  console.log("    COMPLETE STATUS:", status);
  return status;
}
export const deleteTodo = async (id: string): Promise<number> => {
  const response = await axios.delete(apiUrl + `/tasks/${id}`);
  const status = response.status;
  console.log("DEBUG:")
  console.log("    DELETE STATUS:", status);
  return status;
}