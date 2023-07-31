import { Router } from 'express'
import {
  addTodoHandler,
  updateTodo,
  getTodos,
  deleteTodo,
} from '../controllers/todos'

const router = Router()

router.post('/', addTodoHandler)
router.get('/', getTodos)
router.delete('/:id', deleteTodo)
router.patch('/:id', updateTodo)

export default router
