import React from 'react';
interface Props {
  children: React.ReactNode;
}
const TaskCard = ({ children }: Props) => (
  <div className="bg-white border-[#E1E1E1] shadow-lg rounded-xl p-4 hover:shadow-2xl transition-all duration-200 h-full flex flex-col justify-between">
    {children}
  </div>
);
export default TaskCard;
