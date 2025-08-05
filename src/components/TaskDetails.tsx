import { useLoaderData, useNavigate } from "react-router-dom";
import { useAppDispatch, type Todo } from "../types/interfaces";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { deleteTodoAsync } from "../features/todo/todoSlice";
import deleteIgm from '../assets/deletess.jpg'

const TaskDetails = () => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const todo = useLoaderData() as Todo;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(
    todo.completed ? "Completed" : "InProgress"
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleTaskSubmit = () => {
    if (status === "Done") {
      setShowModal(true);
    } else {
      console.log("Task not marked as done yet.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Task Details</h2>
        <div className="flex gap-4">
          <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-2 px-4 rounded-lg flex items-center gap-1">
            <MdEdit size={18} />
            Edit Task
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#60E5AE] hover:bg-[#4cbf8d]  text-white font-semibold py-2 px-4 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>

      <hr className="mb-6" />

      <div className="flex items-start gap-6 mb-8">
        <div className="w-16 h-16 rounded-full bg-[#60E5AE]/20 flex items-center justify-center">
          <span className="text-[#60E5AE] text-3xl font-bold">K</span>{" "}
          
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {todo.title}
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl">
            {todo.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
        <div className="flex items-center gap-2 text-gray-600">
          <FaCalendarAlt className="text-lg text-gray-500" />
          <span className="text-sm">
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(todo.dueDate).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="text-sm font-semibold text-yellow-500 flex items-center gap-1">
          <span className="text-yellow-400 text-lg">●</span> {status}
        </div>
      </div>

      <div className="mb-10">
        <label
          htmlFor="status"
          className="text-sm font-medium text-gray-600 block mb-2"
        >
          Change Status
        </label>
        <select
          id="status"
          name="status"
          className="w-64 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#60E5AE]"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">InProgress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        <button
          className="bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 px-4 rounded-lg"
          onClick={() => setShowConfirmDelete(true)} 
        >
          Delete Task
        </button>

        <button
          className="bg-[#60E5AE] hover:bg-[#4cbf8d] text-white font-semibold py-2 px-6 rounded-lg"
          onClick={handleTaskSubmit}
        >
          Submit
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => {
                dispatch(deleteTodoAsync(String(todo.id)));
                navigate("/todos/");
              }}
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-[#60E5AE] mb-4">
              🎉 Congratulations
            </h2>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Successfully Completed the Task!
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You have successfully completed the task and earned{" "}
              <strong>20 points</strong>.
            </p>
            <button
              onClick={() => {
                dispatch(deleteTodoAsync(String(todo.id)));
                navigate("/todos/");
              }}
              className="bg-[#60E5AE] hover:bg-[#4cbf8d] text-white font-semibold px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showConfirmDelete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center relative">
            <img
              src={deleteIgm}
              alt="Confirm Delete"
              className="mx-auto w-32 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Are you sure!!
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  dispatch(deleteTodoAsync(String(todo.id)));
                  navigate("/todos/");
                }}
                className="bg-[#60E5AE] hover:bg-[#4cbf8d] text-white font-semibold px-6 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-6 py-2 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
