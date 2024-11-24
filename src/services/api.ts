import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  // timeout: 20000,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

export default api
