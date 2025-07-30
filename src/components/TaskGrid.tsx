import React from 'react'
interface Props{
    children: React.ReactNode;

}

const TaskGrid = ({children}: Props) => {
  return (
    <div>{children}</div>
  )
}

export default TaskGrid