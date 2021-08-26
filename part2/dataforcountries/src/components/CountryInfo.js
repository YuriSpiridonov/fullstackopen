import React from 'react'
import Weather from './Weather'
import Language from './Language'

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
    <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <Language key={language.name} language={language.name} />
        )}
      </ul>
    <img src={country.flag} width="33%" height="33%" />
    <Weather capital={country.capital} />
  </div>
)

export default CountryInfo
