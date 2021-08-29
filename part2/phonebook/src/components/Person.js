import React from 'react';

const Person = ({ person, deletePerson }) => (
  <li>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}>Delete</button>
  </li>
)

export default Person;
