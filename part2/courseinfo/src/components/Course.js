import React from 'react';

const H2Header = ({ header }) => <h2>{header}</h2>

const CourseContent = ({ course }) => (
  <div>
    <ul>
      {course.map(({ name, exercises, id }) => (
        <CoursePart key={id} name={name} exercises={exercises} />
      ))}
    </ul>
  </div>
)

const CoursePart = ({ name, exercises }) => <li>{name}: {exercises}</li>

const TotalExercises = ({ exercises }) => {
  const total = exercises.reduce((total_exercises, part) => total_exercises + part.exercises, 0)
  return (
    <p>
      <strong>There are total of {total} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => (
  <div>
    <H2Header key={course.id} header={course.name} />
    <CourseContent course={course.parts} />
    <TotalExercises exercises={course.parts} />
  </div>
)

export default Course;
