import React from 'react'
import Country from './Country'

const Countries = ({ countries, filterValue }) => {
  let filtered = []

  if (filterValue.length > 0) {
    filtered = countries.filter(country => 
      country.name.toLowerCase().includes(filterValue.toLowerCase()))
  } else {
    filtered = countries
  }
    
  if (filtered.length > 10) {
    return 'Too many matches, specify another filter'
    
  } else if (filtered.length === 1) {
    return (
      <div>
        <h1>{filtered[0].name}</h1>
          <p>capital {filtered[0].capital}</p>
          <p>population {filtered[0].population}</p>
        <h2>languages</h2>
          <ul>
            {filtered[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
        <img src={filtered[0].flag} width="33%" height="33%" />
      </div>
        )
  } else {
    return (
      <div>
        <ul>
          {filtered.map(country =>
            <Country
                key={country.name} 
                country={country}  
            />
          )}
        </ul>
      </div>
    )
  }
}

export default Countries
