import React from 'react'

const Header = (props) => (
    <h2>{props.course}</h2>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part => 
            <Part key={part.id} part={part} />
        )}
    </div>
)

const Total = ({ parts }) => {
    const total = () => {
        return parts
            .map(part => part.exercises)
            .reduce((a, b) => a + b, 0)
    }

    return (
        <b>
            total of {total()} exercises
        </b>
    )
}

const Course = ({ course }) => (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
)

export default Course;