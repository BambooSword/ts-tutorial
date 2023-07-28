import React, { useRef } from 'react';
import type { FC } from 'react';
import { ITodo } from '../App'
import './NewTodo.css'

interface INewTodoProps {
	updateList: (todo: ITodo) => void
}

const NewTodo: FC<INewTodoProps> = ({ updateList }): JSX.Element => {
	const textInputRef = useRef<HTMLInputElement>(null)
	const todoSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const enteredText = textInputRef.current!.value;
		if (enteredText) {
			console.log("🚀 ~ file: NewTodo.tsx:10 ~ todoSubmitHandler ~ enteredText:", enteredText)
			updateList({
				id: Math.random() + '',
				text: enteredText
			})
		}
	}
	return <form onSubmit={todoSubmitHandler}>
		<div>
			<label htmlFor="todo-text">Todo Text</label>
			<input type="text" id='todo-text' ref={textInputRef} />
		</div>
		<button type="submit">ADD TODO</button>
	</form>
}

export default NewTodo;