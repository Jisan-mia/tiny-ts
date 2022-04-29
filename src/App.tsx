import React, {useState} from 'react';
import './App.scss';
import TodoInput from './components/Todo/TodoInput';
import Todos from './components/Todo/Todos';

function App() {

  const [todo, setTodo] = useState<string>("")



  return (
    <>
      <TodoInput todo={todo} setTodo={setTodo} />
      <Todos />
    </>
  );
}

export default App;
