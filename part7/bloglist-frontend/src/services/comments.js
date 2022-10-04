/* eslint-disable */
import axios from 'axios'
// const baseUrl = (id) => `/api/blogs/${id}/comments`

const create = async (id, comment) => {
  // const config = {
  //   headers: { Authorization: token },
  // }
  // console.log('comment in services before post: ', { comment })
  const response = await axios.post(`/api/blogs/${id}/comments`, { comment }) // , config)
  return response.data
}

export default { create }
