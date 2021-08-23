import React, { useState } from 'react'

const Person = ({ person }) => <li key={person.name}>{person.name} {person.number}</li>

const Alert = ({ name }) => window.alert(`${name} is already added to phonebook`);

const Filter = ({ filter, handleFilter }) => (
  <div>
    <form>
      <div>
        filter shown with <input 
          value={filter} 
          onChange={handleFilter}
        />
      </div>
    </form>
  </div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <div>
    <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
)

const Persons = ({ persons, filterValue }) => (
    <div>
      <ul>
        {persons.filter(person => {if (filterValue === '') {
              return person
            } else if (person.name.toLowerCase().includes(filterValue.toLowerCase())) {
              return person
            }
        })
          .map(person => 
            <Person key={person.name} person={person} />
          )
        }
      </ul>
    </div>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '49-178-3452143' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find((person) => person.name.toLowerCase() === noteObject.name.toLowerCase())) {
      Alert(noteObject)
    } else {
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filter} />
    </div>
  )
}

export default App
