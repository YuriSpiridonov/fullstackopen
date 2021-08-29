import React from 'react';
import Person from "./Person";

const Persons = ({ persons, filterValue, deletePerson }) => {
  return (
    <div>
      <ul>
        {persons.filter(person => {if (filterValue === '') {
          return person
        } else if (person.name.toLowerCase().includes(filterValue.toLowerCase())) {
          return person
        }
        })
        .map(person => 
          <Person
            key={person.id}
            person={person}
            deletePerson={deletePerson}
          />
        )}
      </ul>
    </div>
  )
}

export default Persons;
