import axios from 'axios'
// import { anecdoteToAdd } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
  const anecdote = { content, id: getId(), votes: 0 }// anecdoteToAdd(content)
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

export default {
  getAll,
  addAnecdote
}