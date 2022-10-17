/* eslint-disable */
import axios from 'axios'

const create = async (id, comment) => {
  const response = await axios.post(`/api/blogs/${id}/comments`, { comment }) // , config)
  return response.data
}

export default { create }
