import React from 'react';

const Course = ({ courses }) => {
    return (
      <div>
        <h1>Web develepment curriculum</h1>
        {courses.map(course => {
          console.log(course.name)
          const total = course.parts.reduce((s, p) => s + p.exercises, 0)
          console.log(total)
          return (
            <div>
              <h2 key={course.id}>{course.name}</h2>
              <ul>
                {course.parts.map(part =>
                  <li key={part.id}>
                    {part.name} {part.exercises}
                  </li>
                )}
              </ul>
              <b>total of {total} exercises</b>
            </div>
          )
        }
        )}
      </div>
    )
  }

export default Course;
