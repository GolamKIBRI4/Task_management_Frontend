import React from "react";
import Spins from "./Spins";

const SpinSection: React.FC = () => {
  return (
    <div
      className="
        relative z-10 w-full max-w-6xl mx-auto
        rounded-2xl bg-white shadow-xl
        p-4 sm:p-6 md:p-8
        -mt-4 sm:-mt-6 md:-mt-10
        flex flex-col items-center
      "
    >
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
          Spins
        </h2>
      </div>

      <Spins />
    </div>
  );
};

export default SpinSection;
