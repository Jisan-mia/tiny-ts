import React from 'react'
import './trello.css'


interface IProps {
  isOver?: boolean,
  children: JSX.Element[] | JSX.Element
}

const Column:React.FC<IProps> = ({isOver, children}) => {
  const className = isOver ? " highlight-region" : "";

  return (
    <div className={`col${className}`}>
      {children}
    </div>
  )
}

export default Column