import React from 'react';

interface Props {
  children: React.ReactNode;
}

const TaskGrid = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {children}
    </div>
  );
};

export default TaskGrid;