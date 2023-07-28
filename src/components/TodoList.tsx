import React from 'react'
import type { ITodo } from '../App'


interface IToDoListProps {
	items: ITodo[],
	onFinish: (id: string) => void
}
const TodoList: React.FC<IToDoListProps> = ({ items, onFinish }) => {

	return <ul>
		{items.map(item => (
			<li key={item.id}>{item.text} <span onClick={() => onFinish(item.id)}>finished</span></li>

		))}
	</ul>
}

export default TodoList;