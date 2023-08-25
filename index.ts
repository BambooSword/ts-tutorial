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
  logTodo(ID, title, finished)
})

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log('🚀 ~ file: index.js:11 ~ title:', title)
  console.log('🚀 ~ file: index.js:10 ~ ID:', id)
  console.log('🚀 ~ file: index.js:13 ~ finished:', completed)
}

const JsonObj = '{"hello": "world"}'

const a = JSON.parse(JsonObj)
console.log('🚀 ~ file: index.ts:30 ~ a:', a)

const todayWeather = {
  date: new Date(),
  weather: 'sunny',
}

const logWeather = ({ date, weather }: { date: Date; weather: string }) => {
  console.log('====================================')
  console.log(date)
  console.log(weather)
  console.log('====================================')
}

logWeather(todayWeather)

const threeDimensional = [
  [
    ['365', '1001'],
    ['fairy', 'Cyclops'],
  ],
]
