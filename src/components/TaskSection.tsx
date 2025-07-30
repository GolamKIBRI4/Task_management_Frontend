/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CreateTask from "./CreateTask";
import TaskGrid from "./TaskGrid";
import TaskCard from "./TaskCard";
import { useAppSelector } from "../types/interfaces";

const TaskSection = () => {
  const [addVisibility, setAddVisibility] = useState(false);

  const todos = useAppSelector((s) => s.todos);

  const toggleNewTaskForm = () => setAddVisibility(!addVisibility);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto rounded-2xl bg-white shadow-xl p-4 sm:p-6 md:p-8 -mt-4 sm:-mt-6 md:-mt-10 flex flex-col">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
          All Tasks
        </h2>
        {/* Sort Filter */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div>
            <select name="taskcategory" id="taskcategory" className="p-2 rounded-lg border border-gray-300">
              <option value="">Select Task Category</option>
            </select>
          </div>
          <div>
            <select className="p-2 rounded-lg border border-gray-300" name="statussort" id="statussort">
              <option value="">All Tasks</option>
            </select>
          </div>
          <div>
            <button
              onClick={toggleNewTaskForm}
              className="p-2 bg-[#60E5AE] text-white rounded-lg hover:bg-[#4cbf8d] transition"
            >
              Add New Task
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Form Below Button */}
      {addVisibility && (
        <div className="mt-4 sm:mt-6 md:mt-8">
          <CreateTask />
        </div>
      )}

      {/* Grid of Cards */}
      <TaskGrid>
        
        {todos.map((todo: any) => (
          <TaskCard key={todo.id}>
            <div className="flex flex-col gap-2 h-full">
              {/* Title */}
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full bg-[#60E5AE]/20 text-[#60E5AE] p-2">
                  <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" fill="#60E5AE" /></svg>
                </span>
                <h3 className="font-bold text-lg text-gray-900">{todo.title}</h3>
              </div>
              {/* Description */}
              <p className="text-gray-500 text-sm">{todo.description}</p>
              {/* Due Date & Status */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="7" stroke="#60E5AE" /></svg>
                  {todo.dueDate && (
                    <span>
                      {new Date(todo.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-semibold ${todo.completed ? 'text-green-500' : 'text-pink-500'}`}>
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              {/* Priority */}
              <div className="mt-1 text-xs">
                <span className="font-semibold text-gray-600">Priority:</span> {todo.priority}
              </div>
            </div>
          </TaskCard>
        ))}
      </TaskGrid>
    </div>
  );
};

export default TaskSection;
