import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(response => {
          setCountry( { ...response.data[0], found: true })
        })
        .catch((error) => {
          setCountry({ found: false })
        })
    }
  }, [name])

  return country
}