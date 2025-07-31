import axios from "axios";
import { type LoaderFunctionArgs } from "react-router-dom";
import type { Todo } from '../types/interfaces';

export const taskDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  try {
    const response = await axios.get(`http://localhost:3010/todos/${id}`);
    const todo: Todo = response.data;

    // ✅ Return it here inside the try block
    return {
      ...todo,
      id: todo._id, // Normalize _id to id
    };
  } catch (error) {
    console.error("Failed to load task details:", error);
    throw error;
  }
};
