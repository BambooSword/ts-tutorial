import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'

export interface ITodo {
  id: string,
  text: string
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const updateTodoList = (todo: ITodo) => {
    setTodos((previousTodos) => [...previousTodos, todo])
  }
  const deleteTodo = (id: string) => {
    setTodos(previousTodos => previousTodos.filter(todo => todo.id !== id))
  }


  return (
    <div className="App">
      <NewTodo updateList={updateTodoList} />
      <TodoList items={todos} onFinish={deleteTodo} />
    </div>
  );
}

export default App;
