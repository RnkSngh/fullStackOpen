import React from 'react'
const Header = (props) =>(
  <h1>{props.course.name}</h1>
)


const Content = (props) =>(
  props.course.parts.map(part=>(
    <p>
    {part.name} {part.exercises}
    </p>
    )
  )
)


const Total = (props) => {
  const total = props.course.parts.reduce((a,b) => (a+b.exercises), 0);
  return(
    <p>Number of exercises {total}</p>
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
    <div>
      <Header course={course.name}/>
      <Content course={course.parts}/>
      <Total course={course.parts}/>
    </div>
  )
}

export default App