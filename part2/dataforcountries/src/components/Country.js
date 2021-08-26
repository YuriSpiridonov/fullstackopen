import React, { useState } from 'react'
import CountryInfo from './CountryInfo'


const Country = ({ country }) => {
  const [ state, setState ] = useState(false)
  
  const handleClick = () => {
    setState(!state)
  }

  return (
  <li>
    {country.name} <button onClick={handleClick}>show</button>
    {state && <CountryInfo country={country} />}
  </li>
  )
}

export default Country
