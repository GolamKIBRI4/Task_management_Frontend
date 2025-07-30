import { useState } from "react";
import { addTodoAsync } from "../features/todo/todoSlice";
import { useAppDispatch, type Todo } from "../types/interfaces";

const createEmptyTodo = (): Omit<Todo, "id"> => ({
  title: "",
  description: "",
  dueDate: "",
  priority: "low",
  completed: false,
});

const CreateTask = () => {
  const [input, setInput] = useState<Omit<Todo, "id">>(createEmptyTodo());
  const dispatch = useAppDispatch();

  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(addTodoAsync(input));

    setInput(createEmptyTodo());
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-none p-8 space-y-6 absolute right-0">
      <h2 className="text-center text-3xl font-poppins font-bold text-gray-900">
        Add Todo
      </h2>
      <p className="text-center text-sm text-[#667085]">
        To create a new task, please fill in the details below
      </p>
      <form onSubmit={addTodoHandler} className="space-y-4">
        <div>
          <label className="block text-gray-700">
            <strong>Todo</strong>
          </label>
          <input
            type="text"
            placeholder="Enter a todo"
            className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">
            <strong>Description</strong>
          </label>
          <input
            type="text"
            placeholder="Enter a description"
            className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
            value={input.description}
            onChange={(e) => setInput({ ...input, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">
            <strong>Due Date</strong>
          </label>
          <input
            type="date"
            className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
            value={input.dueDate}
            onChange={(e) => setInput({ ...input, dueDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">
            <strong>Priority</strong>
          </label>
          <select
            value={input.priority}
            onChange={(e) => setInput({ ...input, priority: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white rounded-lg bg-[#60E5AE] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
