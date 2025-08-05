import React, { useState, useRef } from "react";
 import { useNavigate } from "react-router-dom";

const allCategories = [
  "Arts and Craft",
  "Nature",
  "Family",
  "Sport",
  "Friends",
  "Meditation",
];

const Spins: React.FC = () => {
    const navigate=useNavigate();
   
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Family"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResultCategory, setSpinResultCategory] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const getRandomCategory = () => {
    const index = Math.floor(Math.random() * allCategories.length);
    return allCategories[index];
  };

  const getRandomTaskFromSelected = () => {
    if (selectedCategories.length === 0) return "No category selected";
    const index = Math.floor(Math.random() * selectedCategories.length);
    return `Task from ${selectedCategories[index]}`;
  };

  const handleSpin = () => {
    if (spinning) return;

    const resultCategory = getRandomCategory();
    const index = allCategories.indexOf(resultCategory);
    const segmentAngle = 360 / allCategories.length;

    const pointerOffset = segmentAngle / 2;
    const spins = 6;
    const baseRotation = spins * 360 + (index * segmentAngle) + pointerOffset;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 7s ease-in-out";
      wheelRef.current.style.transform = `rotate(${rotation + baseRotation}deg)`;
    }

    setSpinning(true);
    setSpinResultCategory(null);
    setSelectedTask(null);
    setRotation((prev) => prev + baseRotation);

    setTimeout(() => {
      const task = getRandomTaskFromSelected();
      setSpinning(false);
      setSpinResultCategory(resultCategory);
      setSelectedTask(task);
    }, 7000);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleGoToTask = () => {
      navigate('/todos/');
    
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-6">
      {/* Header + Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full mb-6 relative z-20">
        <h2 className="text-2xl font-bold text-gray-900">Spin Wheel</h2>

        <div className="relative w-full sm:w-64">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full bg-white border border-gray-300 text-left rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60E5AE] transition"
          >
            {selectedCategories.length > 0
              ? selectedCategories.join(", ")
              : "Select Task Category"}
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-full max-h-60 overflow-y-auto rounded-lg shadow-lg bg-white border border-gray-200 z-30">
              {allCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="form-checkbox h-4 w-4 text-[#60E5AE] mr-2"
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Wheel */}
      <div className="relative w-full flex justify-center">
        <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px]">

          <div
            ref={wheelRef}
            className="w-full h-full rounded-full border-[10px] border-orange-500 relative transition-transform duration-[7s] ease-in-out bg-white"
          >
            {allCategories.map((cat, index) => (
              <div
                key={index}
                className="absolute w-1/2 h-1/2 top-1/2 left-1/2 origin-top-left flex justify-end items-center pr-2 text-xs font-semibold text-gray-800"
                style={{
                  transform: `rotate(${(360 / allCategories.length) * index}deg)`,
                }}
              >
                {cat}
              </div>
            ))}
          </div>
          {/* Pointer */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[35px] border-l-transparent border-r-transparent border-t-green-500 shadow-md" />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 text-center mt-4">Spin Wheel to pick your task</p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={handleSpin}
          disabled={spinning}
          className={`px-6 py-2 rounded-md font-semibold text-white ${
            spinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#60E5AE] hover:bg-[#4cbf8d]"
          }`}
        >
          {spinning ? "Spinning..." : "Spin 🎯"}
        </button>

        {!spinning && selectedTask && (
          <button
            onClick={handleGoToTask}
            className="px-6 py-2 rounded-md font-semibold text-white bg-[#60E5AE] hover:bg-[#4cbf8d]"
          >
            Go To Task
          </button>
        )}
      </div>

      {/* Result */}
      {spinResultCategory && (
        <div className="mt-6 text-center">
          <p className="text-md text-gray-800 font-medium">
            Landed on: <span className="font-bold">{spinResultCategory}</span>
          </p>
          <p className="font-semibold text-sm text-[#60E5AE] mt-1">
            Task: <span className="font-bold">{selectedTask}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Spins;
