import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/todos/1'

interface IRes {
  id: number
  title: string
  completed: boolean
}
axios.get<IRes>(url).then(response => {
  console.log(response.data)
  console.log(response.data)
  const todo = response.data

  const ID = todo.id
  const title = todo.title
  const finished = todo.completed
  console.log('🚀 ~ file: index.js:11 ~ title:', title)
  console.log('🚀 ~ file: index.js:10 ~ ID:', ID)
  console.log('🚀 ~ file: index.js:13 ~ finished:', finished)
})
