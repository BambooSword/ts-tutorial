'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var axios_1 = require('axios')
var url = 'https://jsonplaceholder.typicode.com/todos/1'
axios_1.default.get(url).then(function (response) {
  console.log(response.data)
  const todo = response.data

  const ID = todo.ID
  const title = todo.title
  const finished = todo.finished

  console.log('🚀 ~ file: index.js:11 ~ title:', title)
  console.log('🚀 ~ file: index.js:10 ~ ID:', ID)
  console.log('🚀 ~ file: index.js:13 ~ finished:', finished)
})
