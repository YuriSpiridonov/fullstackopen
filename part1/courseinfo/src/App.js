import React from 'react';

const Header = (props) => (
    <h1>{props.name}</h1>
)

const Part = (props) => (
    <>
      <h2>{props.part.name}</h2>
      <p>There are <u><b>{props.part.exercises}</b></u> exercises in this part of the course.</p>
    </>
)

const Content = (props) => (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
)

const Total = (props) => {
  let total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  // props.parts.forEach(part => {
  //   total += part.exercises;
  // })
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
