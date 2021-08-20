import React, { useState } from 'react'

const Person = ({ persone }) => <li key={persone.name}>{persone.name}</li>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addPersone = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
    }

    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersone}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(persone => 
          <Person key={persone.name} persone={persone} />
        )}
        
      </ul>
    </div>
  )
}

export default App
