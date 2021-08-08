import React from 'react';

const Header = (props) => (
    <h1>{props.name}</h1>
)

const Part = (props) => {
  return (
    <div>
      <h2>{props.parts.name}</h2>
      <p>There are <u><b>{props.parts.exercises}</b></u> exercises in this part of the course.</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts[0]} />
      <Part parts={props.parts[1]} />
      <Part parts={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  let total = 0;
  // for (let part of props.parts) { // props.parts.forEach(part => {total += part.exercises;})
  //   total += part.exercises;
  // }

  props.parts.forEach(part => {
    total += part.exercises;
  })
  return (
    <>
      <p>There are <u><b>{total}</b></u> exercises in total.</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App;
