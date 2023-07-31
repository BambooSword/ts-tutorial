import { RequestHandler } from 'express'
import { Todo } from '../models/todo'

const todos: Todo[] = []
export const addTodoHandler: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text
  const newTodo = {
    id: Math.random().toString(),
    text,
  }
  todos.push(newTodo)
  res.status(201).json({ message: 'Created to todo.', createdTodo: newTodo })
}

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({
    todos,
  })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id

  const todoIndex = todos.findIndex(todo => todo.id === todoId)
  if (todoIndex < 0) {
    throw new Error(`not have this todo ${todoId}`)
  }
  const text = (req.body as { text: string }).text
  todos[todoIndex] = {
    id: todoId,
    text,
  }
  res.json({ message: 'updated!', updateTodo: todos[todoIndex] })
}
export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id

  const todoIndex = todos.findIndex(todo => todo.id === todoId)
  if (todoIndex < 0) {
    throw new Error(`not have this todo ${todoId}`)
  }
  todos.splice(todoIndex, 1)
  res.json({ message: 'deleted!' })
}
