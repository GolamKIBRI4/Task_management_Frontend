import React from 'react'
interface Props{
    children: React.ReactNode;  
}

const TaskCard = ({children}:Props) => {
  return (
    <div>{children}</div>
  )
}

export default TaskCard