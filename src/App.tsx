import React from 'react';
import './App.scss';
import TodoInput from './components/Todo/TodoInput';
import Todos from './components/Todo/Todos';

function App() {
  return (
    <>
      <TodoInput />
      <Todos />
    </>
  );
}

export default App;
