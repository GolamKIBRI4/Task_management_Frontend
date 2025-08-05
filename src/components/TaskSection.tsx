/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TaskGrid from "./TaskGrid";
import TaskCard from "./TaskCard";
import { useAppDispatch, useAppSelector } from "../types/interfaces";
import { fetchTodos } from "../features/todo/todoSlice";
import { Link, Outlet, useParams } from "react-router-dom"; // ✅ Add useParams

const TaskSection = () => {
  const [addVisibility, setAddVisibility] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((s) => s.todos);

  const { id } = useParams(); // ✅ Get task ID from route params
  const isViewingTask = Boolean(id); // ✅ True if viewing task detail

  const toggleNewTaskForm = () => setAddVisibility(!addVisibility);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto rounded-2xl bg-white shadow-xl p-4 sm:p-6 md:p-8 -mt-4 sm:-mt-6 md:-mt-10 flex flex-col min-h-[70vh]">
      {/* Heading (optional: hide when viewing task details) */}
      {!isViewingTask && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            All Tasks
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <select name="taskcategory" id="taskcategory" className="p-2 rounded-lg border border-gray-300">
              <option value="">Select Task Category</option>
            </select>
            <select className="p-2 rounded-lg border border-gray-300" name="statussort" id="statussort">
              <option value="">All Tasks</option>
            </select>
            <button
              onClick={toggleNewTaskForm}
              className="p-2 bg-[#60E5AE] text-white rounded-lg hover:bg-[#4cbf8d] transition"
            >
              Add New Task
            </button>
          </div>
        </div>
      )}

      {/* Task Creation Form */}
      {!isViewingTask && addVisibility && (
        <div className="mt-4 sm:mt-6 md:mt-8">
          <CreateTask />
        </div>
      )}


      {!isViewingTask ? (
        
        <TaskGrid>
          {todos.map((todo: any) => (
            <Link to={`/todos/${todo.id}`} key={todo.id}>
              <TaskCard>
                <div className="flex flex-col gap-2 h-full">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-[#60E5AE]/20 text-[#60E5AE] p-2">
                      <svg width="24" height="24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#60E5AE" />
                      </svg>
                    </span>
                    <h3 className="font-bold text-lg text-gray-900">{todo.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">{todo.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <svg width="16" height="16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#60E5AE" />
                      </svg>
                      {todo.dueDate && (
                        <span>
                          {new Date(todo.dueDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        todo.completed ? "text-green-500" : "text-pink-500"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-gray-600">Priority:</span> {todo.priority}
                  </div>
                </div>
              </TaskCard>
            </Link>
          ))}
        </TaskGrid>
      ) : (
        
        <div className="flex-1 w-full h-full mt-4 sm:mt-6 md:mt-8">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default TaskSection;