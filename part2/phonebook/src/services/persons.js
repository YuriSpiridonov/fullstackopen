import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, personObject) => {
    console.log(`update ${id} ${personObject.name}`)
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => {
        return response.data
    })
}

const remove = id => {
    axios.delete(`${baseUrl}/${id}`)
}

const exportObject = { getAll, create, update, remove }

export default exportObject
