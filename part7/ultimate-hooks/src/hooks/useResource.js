import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const config = {
    headers: { 'Content-Type': 'application/json',
               'Authorization': 'JWT fefege...' },
  }
  
  useEffect(() => {
    axios
      .get(baseUrl, config)
      .then(response => setResources(response.data))
      .catch((error) => console.log(error))
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource, config)
      .then(response => setResources([...resources, response.data]))
      .catch((error) => console.log(error))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}