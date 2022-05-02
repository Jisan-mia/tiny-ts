import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from './Header'
import MainContainer from './MainContainer'
import './trello.css'


const TrelloApp = () => {
  
  return (
    
    <DndProvider backend={HTML5Backend}>
      <Header />
      <MainContainer />
    </DndProvider>
  )
}

export default TrelloApp