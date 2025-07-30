import { useState } from "react";
import CreateTask from "./CreateTask";

const TaskSection = () => {
  const [addVisibility, setAddVisibility] = useState(false);

  const toggleNewTaskForm = () => {
    setAddVisibility(!addVisibility);
  };

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

      {/* Grid Section (content remains unaffected by the form opening) */}
      {/* Add content here */}
    </div>
  );
};

export default TaskSection;
