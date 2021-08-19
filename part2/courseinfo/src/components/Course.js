import React from 'react';

const H1Header = ({ header }) => <h1>{header}</h1>

const H2Header = ({ header }) => <h2>{header}</h2>

const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <p>
    <strong>total of {total} exercises</strong>
    </p>
  )
}

const Part = ({ part }) => <li>{part.name} {part.exercises}</li>

const Course = ({ courses }) => {
    return (
      <div>
        <H1Header header='Web develepment curriculum' />
        {courses.map(course => {
          return (
            <div>
              <H2Header key={course.id} header={course.name} />
              <ul>
                {course.parts.map(part =>
                  <Part key={part.id} part={part} />
                )}
              </ul>
              <Total course={course} />
            </div>
          )}
        )}
      </div>
    )
  }

export default Course;
