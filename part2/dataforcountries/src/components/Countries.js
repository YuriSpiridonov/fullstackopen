import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

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
      <CountryInfo country={filtered[0]} />
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
