import React, { useState } from 'react'

const Person = ({ person }) => <li key={person.name}>{person.name}</li>

const Alert = ({ name }) => window.alert(`${name} is already added to phonebook`);

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
    }

    if (persons.find((person) => person.name === noteObject.name)) {
      Alert(noteObject)
    } else {
      setPersons(persons.concat(noteObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            // onChange={checkPerson}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
        
      </ul>
    </div>
  )
}

export default App
