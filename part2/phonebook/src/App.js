import React, { useEffect, useState } from 'react'

import Alert from './components/Alert'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  const getAllHook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => 
        console.error(error)
      )
  }

  useEffect(getAllHook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const checkPerson = persons.find(person => 
      person.name.toLowerCase() === personObject.name.toLowerCase())

    if (checkPerson && checkPerson.number === newNumber) {
      Alert(personObject)      
    } 
    if (checkPerson && checkPerson.number !== newNumber) {
      const confirmNewNumber = window.confirm(`Are you sure you want update ${checkPerson.name}'s number with a new one?`)
      
      if (confirmNewNumber) {
        const personUpdate = { ...checkPerson, number: newNumber }
        personService
          .update(checkPerson.id, personUpdate)
          .then(returnedPerson =>{
            setPersons(
              persons
                .map(person =>
                  person.id !== checkPerson.id 
                    ? person 
                    : returnedPerson
              )
            )
            setNotification({
              text: `${checkPerson.name}'s number was updated.`,
              type: 'notification'
            })
            setTimeout(() => setNotification(null), 5000)      
          })
          .catch(error =>
            setPersons(persons
              .filter(person => 
                person.name !== checkPerson.name
              )
            )
          )
            setNotification({
              text: `${checkPerson.name} has already been deleted from the server.`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
      }
    } 
    if (!checkPerson) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setNotification({
            text: error.response.data.error, 
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      setNotification({
        text: `${personObject.name} added to the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${person.name}?`)
    
    if (confirmDelete) {
      personService
        .remove(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
      setPersons(persons.filter(person => person.id !== id))
      setNotification({
        text: `${person.name} was deleted from the phonebook.`,
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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

  const personsAfterFilter = 
    filter === ''  ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))

      return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsAfterFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
