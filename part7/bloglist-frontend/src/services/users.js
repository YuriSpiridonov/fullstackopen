/* eslint-disable */
import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getCurrentUser = async (user) => {
  const response = await axios.get(`${baseUrl}/${user._id}`)
  return response.data
}

export default { getUsers, getCurrentUser }
